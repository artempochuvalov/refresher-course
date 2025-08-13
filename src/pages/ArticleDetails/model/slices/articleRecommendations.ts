import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

import {
    fetchRecommendations
} from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import type { ArticleRecommendationsSchema } from '../types/articleRecommendationsSchema';

const initialState: ArticleRecommendationsSchema = {
    isLoading: false,
    error: undefined,
    entities: {},
    ids: [],
};

export const recommendationsAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
});

const articleCommentsSlice = createSlice({
    name: 'articleDetails/recommendations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                recommendationsAdapter.setMany(state, action);
                state.isLoading = false;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleRecommendationsActions } = articleCommentsSlice;
export const { reducer: articleRecommendationsReducer } = articleCommentsSlice;
