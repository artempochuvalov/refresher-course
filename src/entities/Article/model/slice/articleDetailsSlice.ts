import { createSlice } from '@reduxjs/toolkit';

import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import type { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const articleDetails = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsActions } = articleDetails;
export const { reducer: articleDetailsReducer } = articleDetails;
