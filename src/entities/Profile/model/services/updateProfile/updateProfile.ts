import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import {
    getEditableProfileData
} from '../../selectors/getEditableProfileData/getEditableProfileData';
import type { Profile } from '../../types';

export const updateProfile = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'entity/updateProfile',
    async (_, { getState, rejectWithValue, extra: { api } }) => {
        try {
            const profileData = getEditableProfileData(getState());
            const response = await api.post<Profile>('/profile', profileData);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
