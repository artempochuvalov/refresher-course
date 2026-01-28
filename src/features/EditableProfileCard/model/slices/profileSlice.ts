import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfile } from '../services/updateProfile/updateProfile';
import type { ProfileSchema } from '../types';

const initialState: ProfileSchema = {
    profile: undefined,
    editableProfile: undefined,
    isLoading: false,
    readonly: true,
    error: undefined,
    validationProfileErrors: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly(state, action: PayloadAction<boolean>) {
            state.readonly = action.payload;
        },
        cancelEdit(state) {
            state.readonly = true;
            state.validationProfileErrors = undefined;
            state.editableProfile = state.profile;
        },
        updateProfileData(state, action: PayloadAction<Profile>) {
            state.editableProfile = {
                ...state.editableProfile,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
                state.editableProfile = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateProfile.pending, (state) => {
                state.error = undefined;
                state.validationProfileErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.readonly = true;
                state.profile = action.payload;
                state.editableProfile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.validationProfileErrors = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
