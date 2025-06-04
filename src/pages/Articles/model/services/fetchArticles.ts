import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

type FetchArticlesProps = {
    page?: number;
    limit?: number;
}

export const fetchArticles = createAsyncThunk<
    Article[],
    FetchArticlesProps,
    ThunkConfig<string>
>(
    'articles/fetchArticles',
    async (props, { rejectWithValue, extra: { api } }) => {
        try {
            const { page, limit } = props;

            const response = await api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                },
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
