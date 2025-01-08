import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import {
    getEditableProfileData
} from '../../selectors/getEditableProfileData/getEditableProfileData';
import { Profile, ValidateProfileError } from '../../types';
import { validateProfile } from '../validateProfile/validateProfile';

export const updateProfile = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    'entity/updateProfile',
    async (_, { getState, rejectWithValue, extra: { api } }) => {
        try {
            const profileData = getEditableProfileData(getState());
            const validationErrors = validateProfile(profileData);
            if (validationErrors.length > 0) {
                return rejectWithValue(validationErrors);
            }

            const response = await api.put<Profile>('/profile', profileData);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    }
);
