import type { StateSchema } from '@/app/providers/StoreProvider';

export const getEditableProfileData = (state: StateSchema) => (
    state.profile?.editableProfile
);
export const getProfileData = (state: StateSchema) => state.profile?.profile;
export const getProfileError = (state: StateSchema) => state.profile?.error;
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading ?? false;
export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly ?? true;
export const getValidationProfileErrors = (state: StateSchema) => (
    state.profile?.validationProfileErrors
);
