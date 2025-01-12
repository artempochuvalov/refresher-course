import type { StateSchema } from 'app/providers/StoreProvider';

export const getValidationProfileErrors = (state: StateSchema) => (
    state.profile?.validationProfileErrors
);
