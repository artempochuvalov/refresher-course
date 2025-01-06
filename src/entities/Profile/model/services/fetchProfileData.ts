import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Profile } from '../types';

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'entity/fetchProfileData',
    async (_, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Profile>('/profile');
            const profile = response.data;
            if (!profile) {
                throw new Error();
            }

            return profile;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
