import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import type { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 23,
    username: 'admin123',
    city: 'Moscow',
    avatar: '',
    currency: Currency.EUR,
    country: Country.Russia,
};

const dataTestIds = {
    editButton: 'EditableProfileCardHeader.EditButton',
    cancelButton: 'EditableProfileCardHeader.CancelButton',
    saveButton: 'EditableProfileCardHeader.SaveButton',
    firstNameInput: 'EditableProfileCard.FirstNameInput',
    lastNameInput: 'EditableProfileCard.LastNameInput',
    validationError: 'EditableProfileCard.Error.Paragraph',
};

describe('features/EditableProfileCard', () => {
    beforeEach(() => {
        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    editableProfile: profile,
                    profile,
                    isLoading: false,
                    readonly: true,
                },
                user: {
                    authData: {
                        id: '1',
                        username: 'admin',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });
    });

    test('Readonly mod switches', async () => {
        await userEvent.click(screen.getByTestId(dataTestIds.editButton));
        expect(screen.getByTestId(dataTestIds.saveButton)).toBeInTheDocument();
        expect(screen.getByTestId(dataTestIds.cancelButton)).toBeInTheDocument();
    });

    test('Cancel editing works properly', async () => {
        const firstNameInput = screen.getByTestId(dataTestIds.firstNameInput);
        const lastNameInput = screen.getByTestId(dataTestIds.lastNameInput);

        await userEvent.click(screen.getByTestId(dataTestIds.editButton));

        await userEvent.clear(firstNameInput);
        await userEvent.clear(lastNameInput);

        await userEvent.type(firstNameInput, 'user');
        await userEvent.type(lastNameInput, 'user');

        await userEvent.click(screen.getByTestId(dataTestIds.cancelButton));

        expect(firstNameInput).toHaveValue('admin');
        expect(lastNameInput).toHaveValue('admin');
    });

    test('Empty inputs cause validation error', async () => {
        await userEvent.click(screen.getByTestId(dataTestIds.editButton));

        await userEvent.clear(screen.getByTestId(dataTestIds.firstNameInput));

        await userEvent.click(screen.getByTestId(dataTestIds.saveButton));

        expect(screen.getByTestId(dataTestIds.validationError)).toBeInTheDocument();
    });

    test('Save button fires update request', async () => {
        const mockedPutRequest = jest.spyOn($api, 'put');

        const firstNameInput = screen.getByTestId(dataTestIds.firstNameInput);

        await userEvent.click(screen.getByTestId(dataTestIds.editButton));

        await userEvent.clear(firstNameInput);
        await userEvent.type(firstNameInput, 'user');

        await userEvent.click(screen.getByTestId(dataTestIds.saveButton));
        expect(mockedPutRequest).toHaveBeenCalled();
    });
});
