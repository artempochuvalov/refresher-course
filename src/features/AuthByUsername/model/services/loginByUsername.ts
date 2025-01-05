import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';

type LoginByUsernameBody = {
    username: string;
    password: string;
};

export const loginByUsername = createAsyncThunk<User, LoginByUsernameBody, { rejectValue: string }>(
    'feature/loginByUsername',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>(
                'http://localhost:8000/login',
                authData
            );
            const user = response.data;
            if (!user) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
            thunkApi.dispatch(userActions.setAuthData(user));

            return response.data;
        } catch (error) {
            console.error(error);
            return thunkApi.rejectWithValue('error');
        }
    }
);
