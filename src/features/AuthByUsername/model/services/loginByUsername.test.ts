import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
    test('success login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);

        const userAuthData = {
            username: '123',
            id: '1',
        };
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userAuthData }));

        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userAuthData));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userAuthData);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
