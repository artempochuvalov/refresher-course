import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addArticleComment = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addArticleComment',
    async (text, {
        getState,
        dispatch,
        rejectWithValue,
        extra: { api },
    }) => {
        try {
            const article = getArticleDetailsData(getState());
            const user = getUserAuthData(getState());

            const articleId = article?.id;
            if (!(articleId && user && text)) {
                return rejectWithValue('error');
            }

            const response = await api.post<Comment>('/comments', {
                articleId,
                text,
                userId: user.id,
            });

            const comment = response.data;
            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(articleId));

            return comment;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
