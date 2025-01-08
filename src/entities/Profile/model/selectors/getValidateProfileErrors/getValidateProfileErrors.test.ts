import type { StateSchema } from 'app/providers/StoreProvider';

import { ValidateProfileError } from '../../types';
import { getValidateProfileErrors } from './getValidateProfileErrors';

describe('getValidateProfileErrors.test', () => {
    test('should return value', () => {
        const errors = [
            ValidateProfileError.INCORRECT_CITY,
            ValidateProfileError.NO_DATA,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: {
                validateProfileErrors: errors,
            },
        };
        expect(getValidateProfileErrors(state as StateSchema)).toEqual(errors);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getValidateProfileErrors(state as StateSchema)).toEqual(undefined);
    });
});
