import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListPageNum
} from '../../selectors/articlesListSelectors';
import { articlesListActions } from '../../slices/articlePageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchNextArticles = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articles/fetchNextArticles',
    async (_, { getState, dispatch }) => {
        const page = getArticlesListPageNum(getState());
        const hasMore = getArticlesListHasMore(getState());
        const isLoading = getArticlesListIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesListActions.setPage(page + 1));
            await dispatch(fetchArticles({}));
        }
    }
);
