import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';
import { ArticleFilterField, ArticleFilterOrder } from '@/features/Article/ArticleFilters';

import {
    SEARCH_PARAM,
    SORT_FIELD_PARAM,
    SORT_ORDER_PARAM,
    SORT_TYPE_PARAM
} from '../../../constants';
import { getArticlesListIsMounted } from '../../selectors/articlesListSelectors';
import { articlesListActions } from '../../slices/articlePageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

type InitArticlesPageProps = {
    searchParams?: URLSearchParams;
};

export const initArticlesPage = createAsyncThunk<
    void,
    InitArticlesPageProps,
    ThunkConfig<string>
>(
    'articles/initArticlesPage',
    async (props, { getState, dispatch }) => {
        const { searchParams } = props;

        const sortField = searchParams?.get(
            SORT_FIELD_PARAM
        ) as ArticleFilterField | null | undefined;
        const sortOrder = searchParams?.get(
            SORT_ORDER_PARAM
        ) as ArticleFilterOrder | null | undefined;
        const search = searchParams?.get(SEARCH_PARAM);
        const sortType = searchParams?.get(SORT_TYPE_PARAM) as ArticleType | null | undefined;

        if (sortField) {
            dispatch(articlesListActions.setSortField(sortField));
        }
        if (sortOrder) {
            dispatch(articlesListActions.setSortOrder(sortOrder));
        }
        if (search) {
            dispatch(articlesListActions.setSearch(search));
        }
        if (sortType) {
            dispatch(articlesListActions.setSortType(sortType));
        }

        const isMounted = getArticlesListIsMounted(getState());
        if (!isMounted) {
            dispatch(articlesListActions.initState());
            dispatch(fetchArticles({}));
        }
    }
);
