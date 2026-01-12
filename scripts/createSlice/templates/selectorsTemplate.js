/* eslint-disable max-len */
const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (sliceName) => `import type { StateSchema } from 'app/providers/StoreProvider';

export const get${firstLetterCapitalized(sliceName)}Data = (state: StateSchema) => state.${sliceName}?.data;
export const getIsLoading = (state: StateSchema) => state.${sliceName}?.isLoading ?? false;
export const getError = (state: StateSchema) => state.${sliceName}?.error;
`;
