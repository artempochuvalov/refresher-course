import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoutePaths } from 'app/providers/routeConfig/routeConfig';
import type { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';

type LoginByUsernameBody = {
    username: string;
    password: string;
};

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameBody,
    ThunkConfig<string>
>(
    'feature/loginByUsername',
    async (authData, { dispatch, rejectWithValue, extra: { api, navigate } }) => {
        try {
            const response = await api.post<User>('/login', authData);
            const user = response.data;
            if (!user) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
            dispatch(userActions.setAuthData(user));

            navigate?.(RoutePaths.Profile);

            return user;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
