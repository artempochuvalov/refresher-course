import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { ValidationProfileError } from '../constants';
import {
    getEditableProfileData,
    getProfileData,
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
    getValidationProfileErrors
} from './editableProfileCardSelectors';

describe('getEditableProfileData.test', () => {
    test('should return value', () => {
        const profile = {
            first: 'Иван',
            lastname: 'Иванов',
            age: 40,
            city: 'Москва',
            country: Country.Russia,
            currency: Currency.RUB,
            avatar: 'https://www.avatar.png',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                editableProfile: profile,
            },
        };
        expect(getEditableProfileData(state as StateSchema)).toEqual(profile);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEditableProfileData(state as StateSchema)).toEqual(undefined);
    });
});

describe('getProfileData.test', () => {
    test('should return value', () => {
        const profile = {
            first: 'Иван',
            lastname: 'Иванов',
            age: 40,
            city: 'Москва',
            country: Country.Russia,
            currency: Currency.RUB,
            avatar: 'https://www.avatar.png',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                profile,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(profile);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});

describe('getProfileError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'error',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});

describe('getProfileIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                isLoading: true,
            },
        };
        expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileIsLoading(state as StateSchema)).toEqual(false);
    });
});

describe('getProfileReadonly.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                readonly: false,
            },
        };
        expect(getProfileReadonly(state as StateSchema)).toEqual(false);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileReadonly(state as StateSchema)).toEqual(true);
    });
});

describe('getValidateProfileErrors.test', () => {
    test('should return value', () => {
        const errors = [
            ValidationProfileError.INCORRECT_CITY,
            ValidationProfileError.NO_DATA,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validationProfileErrors: errors,
            },
        };
        expect(getValidationProfileErrors(state as StateSchema)).toEqual(errors);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getValidationProfileErrors(state as StateSchema)).toEqual(undefined);
    });
});
