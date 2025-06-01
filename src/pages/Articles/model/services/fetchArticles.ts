import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticles = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articles/fetchArticles',
    async (_, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Article[]>('/articles', {
                // params: {
                //     _expand: 'user',
                // },
            });
            const articles = response.data;
            if (!articles) {
                throw new Error();
            }

            return articles;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
