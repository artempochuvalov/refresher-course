import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page';

import {
    SEARCH_PARAM,
    SORT_FIELD_PARAM,
    SORT_ORDER_PARAM,
    SORT_TYPE_PARAM
} from '../../constants';
import {
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
    getArticlesListSortType
} from '../../model/selectors/articlesListSelectors';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initArticlesPage } from '../../model/services/initArticlePage/initArticlesPage';
import { articlesListReducer } from '../../model/slices/articlePageSlice';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

const Articles = () => {
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const sortField = useSelector(getArticlesListSortField);
    const sortOrder = useSelector(getArticlesListSortOrder);
    const search = useSelector(getArticlesListSearch);
    const sortType = useSelector(getArticlesListSortType);

    useDynamicModuleLoader({
        reducers: {
            articlesList: articlesListReducer,
        },
        keepOnUnmount: true,
    });

    useInitialEffect(() => {
        dispatch(initArticlesPage({ searchParams }));
    });

    useEffect(() => {
        setSearchParams((searchParams) => {
            searchParams.set(SORT_FIELD_PARAM, sortField);
            searchParams.set(SORT_ORDER_PARAM, sortOrder);
            searchParams.set(SEARCH_PARAM, search);
            searchParams.set(SORT_TYPE_PARAM, sortType);
            return searchParams;
        });
    }, [search, setSearchParams, sortField, sortOrder, sortType]);

    const onScrollEnd = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    return (
        <Page onScrollEnd={onScrollEnd}>
            <VStack fullWidth gap="32">
                <ArticlesPageFilters />

                <ArticlesInfiniteList />
            </VStack>
        </Page>
    );
};

export default memo(Articles);
