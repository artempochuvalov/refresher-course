import type { StateSchema } from 'app/providers/StoreProvider';

export const getUserSliceInitted = (state: StateSchema) => state.user._initted;
