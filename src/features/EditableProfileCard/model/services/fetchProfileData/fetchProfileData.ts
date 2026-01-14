import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import type { Profile } from '../../types';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>(
    'entity/fetchProfileData',
    async (id, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Profile>(`/profiles/${id}`);
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
