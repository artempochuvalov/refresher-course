import type { StateSchema } from 'app/providers/StoreProvider';

export const getEditableProfileData = (state: StateSchema) => (
    state.profile?.editableProfile
);
