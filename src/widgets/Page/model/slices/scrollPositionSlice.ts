import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type ScrollPositionSchema, SetScrollPositionPayload } from '../types';

const initialState: ScrollPositionSchema = {
    scrollPositions: {},
};

const scrollPositionSlice = createSlice({
    name: 'scrollPosition',
    initialState,
    reducers: {
        setScrollPosition(state, action: PayloadAction<SetScrollPositionPayload>) {
            const { route, position } = action.payload;
            state.scrollPositions[route] = position;
        },
    },
});

export const { actions: scrollPositionActions } = scrollPositionSlice;
export const { reducer: scrollPositionReducer } = scrollPositionSlice;
