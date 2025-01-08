import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ValidateProfileError } from '../../types';
import { updateProfile } from './updateProfile';

const profile = {
    first: 'Иван',
    lastname: 'Иванов',
    age: 40,
    city: 'Москва',
    country: Country.Russia,
    currency: Currency.RUB,
    avatar: 'https://www.avatar.png',
};

describe('updateProfile.test', () => {
    test('success updated profile', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                editableProfile: profile,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data: profile }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(profile);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                editableProfile: profile,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('empty profile returned', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                editableProfile: profile,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('validation error', async () => {
        const thunk = new TestAsyncThunk(updateProfile, {
            profile: {
                editableProfile: {
                    age: 22,
                    city: 'Moscow',
                },
            },
        });

        const result = await thunk.callThunk();

        expect(thunk.api.put).not.toHaveBeenCalled();
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_PERSONAL_DATA]);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
