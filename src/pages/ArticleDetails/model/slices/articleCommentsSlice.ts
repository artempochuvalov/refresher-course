import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

import { addArticleComment } from '../services/addArticleComment/addArticleComment';
import {
    fetchCommentsByArticleId
} from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';

const initialState: ArticleCommentsSchema = {
    isLoading: false,
    fetchCommentsError: undefined,
    addCommentError: undefined,
    entities: {},
    ids: [],
};

export const commentsAdapter = createEntityAdapter({
    selectId: (comment: Comment) => comment.id,
});

const articleCommentsSlice = createSlice({
    name: 'articleDetails/comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.fetchCommentsError = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                commentsAdapter.setMany(state, action);
                state.isLoading = false;
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchCommentsError = action.payload;
            });

        builder
            .addCase(addArticleComment.pending, (state) => {
                state.addCommentError = undefined;
            })
            .addCase(addArticleComment.rejected, (state, action) => {
                state.addCommentError = action.payload;
            });
    },
});

export const { actions: articleCommentsActions } = articleCommentsSlice;
export const { reducer: articleCommentsReducer } = articleCommentsSlice;
