import type { StateSchema } from '@/app/providers/StoreProvider';

import { getLogginError } from './getLoginError';

describe('getLoginError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getLogginError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLogginError(state as StateSchema)).toEqual(undefined);
    });
});
