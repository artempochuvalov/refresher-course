import { updateProfile } from '../services/updateProfile/updateProfile';
import type { ProfileSchema } from '../types';
import { profileActions, profileReducer } from './profileSlice';

describe('profileSlice.test', () => {
    test('sets readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: true,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(false)
            )
        ).toEqual({
            readonly: false,
        });
    });

    test('cancels edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            validationProfileErrors: [],
            profile: { first: 'b' },
            editableProfile: { first: 'a' },
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.cancelEdit()
            )
        ).toEqual({
            readonly: true,
            validationProfileErrors: undefined,
            profile: { first: 'b' },
            editableProfile: { first: 'b' },
        });
    });

    test('update profile pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            error: 'error',
            validationProfileErrors: [],
            isLoading: false,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfile.pending('')
            )
        ).toEqual({
            error: undefined,
            validationProfileErrors: undefined,
            isLoading: true,
        });
    });

    test('update profile fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            isLoading: true,
            profile: { first: 'a' },
            editableProfile: { first: 'b' },
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfile.fulfilled({ first: 'b' }, '')
            )
        ).toEqual({
            readonly: true,
            isLoading: false,
            profile: { first: 'b' },
            editableProfile: { first: 'b' },
        });
    });
});
