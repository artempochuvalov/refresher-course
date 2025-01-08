import type { StateSchema } from 'app/providers/StoreProvider';

export const getValidateProfileErrors = (state: StateSchema) => (
    state.profile?.validateProfileErrors
);
