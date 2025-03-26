import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';

const initialState: ArticleCommentsSchema = {
    isLoading: false,
    error: undefined,
    entities: {},
    ids: [],
};

export const commentsAdapter = createEntityAdapter({
    selectId: (comment: Comment) => comment.id,
});

const articleCommentsSlice = createSlice({
    name: 'articleComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                commentsAdapter.setMany(state, action);
                state.isLoading = false;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleCommentsActions } = articleCommentsSlice;
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
