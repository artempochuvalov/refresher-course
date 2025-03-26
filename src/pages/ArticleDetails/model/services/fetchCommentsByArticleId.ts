import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });
            const comments = response.data;
            if (!comments) {
                throw new Error();
            }

            return comments;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
