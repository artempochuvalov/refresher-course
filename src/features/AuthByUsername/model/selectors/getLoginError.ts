import type { StateSchema } from '@/app/providers/StoreProvider';

export const getLogginError = (state: StateSchema) => state.loginForm?.error;
