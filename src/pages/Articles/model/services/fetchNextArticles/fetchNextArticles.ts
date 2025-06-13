import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import {
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListLimit,
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
        const limit = getArticlesListLimit(getState());
        const hasMore = getArticlesListHasMore(getState());
        const isLoading = getArticlesListIsLoading(getState());

        if (hasMore && !isLoading) {
            const result = await dispatch(fetchArticles({
                page,
                limit,
            }));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(articlesListActions.setPage(page + 1));
            }
        }
    }
);
