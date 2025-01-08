import type { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { getEditableProfileData } from './getEditableProfileData';

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
