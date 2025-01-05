import type { DeepPartial } from '@reduxjs/toolkit';

import type { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('sets username', () => {
        const state: DeepPartial<LoginSchema> = { username: '1' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('123')
            )
        ).toEqual({ username: '123' });
    });

    test('sets password', () => {
        const state: DeepPartial<LoginSchema> = { password: '1' };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('123')
            )
        ).toEqual({ password: '123' });
    });
});
