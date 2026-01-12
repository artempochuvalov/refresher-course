const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (sliceName) => `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ${firstLetterCapitalized(sliceName)}Schema } from '../types/${sliceName}Schema';

const initialState: ${firstLetterCapitalized(sliceName)}Schema = {
    // Initialize your state properties here
};

export const ${sliceName}Slice = createSlice({
    name: '${sliceName}',
    initialState,
    reducers: {
        // Define your reducers here
        exampleAction: (state, action: PayloadAction<string>) => {
            // Example reducer logic
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state)) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
`;
