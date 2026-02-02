import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import type { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'articleDetails/fetchArticleById',
    async (articleId, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Article>(`/articles/${articleId}`, {
                params: {
                    _expand: 'user',
                },
            });
            const article = response.data;
            if (!article) {
                throw new Error();
            }

            return article;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
