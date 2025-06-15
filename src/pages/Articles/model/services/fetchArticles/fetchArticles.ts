import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

import {
    getArticlesListLimit,
    getArticlesListPageNum,
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder
} from '../../selectors/articlesListSelectors';

type FetchArticlesProps = {
    replace?: boolean;
}

export const fetchArticles = createAsyncThunk<
    Article[],
    FetchArticlesProps,
    ThunkConfig<string>
>(
    'articles/fetchArticles',
    async (_, { rejectWithValue, getState, extra: { api } }) => {
        try {
            const page = getArticlesListPageNum(getState());
            const limit = getArticlesListLimit(getState());
            const sort = getArticlesListSortField(getState());
            const order = getArticlesListSortOrder(getState());
            const search = getArticlesListSearch(getState());

            const response = await api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    q: search,
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
