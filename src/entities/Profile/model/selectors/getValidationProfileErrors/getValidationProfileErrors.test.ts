import type { StateSchema } from 'app/providers/StoreProvider';

import { ValidationProfileError } from '../../types';
import { getValidationProfileErrors } from './getValidationProfileErrors';

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
