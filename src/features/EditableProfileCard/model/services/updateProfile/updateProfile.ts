import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import {
    getEditableProfileData
} from '../../selectors/editableProfileCardSelectors';
import { Profile, ValidationProfileError } from '../../types';
import { validateProfile } from '../validateProfile/validateProfile';

export const updateProfile = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidationProfileError[]>
>(
    'entity/updateProfile',
    async (_, { getState, rejectWithValue, extra: { api } }) => {
        try {
            const profileData = getEditableProfileData(getState());
            const validationErrors = validateProfile(profileData);
            if (validationErrors.length > 0) {
                return rejectWithValue(validationErrors);
            }

            const profileId = profileData?.id ?? '';
            const response = await api.put<Profile>(`/profiles/${profileId}`, profileData);

            const updatedProfile = response.data;
            if (!updatedProfile) {
                throw new Error();
            }

            return updatedProfile;
        } catch (error) {
            console.error(error);
            return rejectWithValue([ValidationProfileError.SERVER_ERROR]);
        }
    }
);
