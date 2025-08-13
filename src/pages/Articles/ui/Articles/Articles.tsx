import { type ArticleListView, ArticlesList, ArticleType } from 'entities/Article';
import {
    type ArticleFilterField,
    type ArticleFilterOrder,
    ArticleFilters
} from 'features/Article/ArticleFilters';
import { ArticleViewSwitcher } from 'features/Article/ViewSwitcher';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'widgets/Page';

import {
    SEARCH_PARAM,
    SORT_FIELD_PARAM,
    SORT_ORDER_PARAM,
    SORT_TYPE_PARAM
} from '../../constants';
import {
    getArticles,
    getArticlesListIsLoading,
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
    getArticlesListSortType,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { fetchNextArticles } from '../../model/services/fetchNextArticles/fetchNextArticles';
import { initArticlesPage } from '../../model/services/initArticlePage/initArticlesPage';
import { articlesListActions, articlesListReducer } from '../../model/slices/articlePageSlice';
import cls from './Articles.module.scss';

type ArticlesProps = {
    className?: string;
};

const Articles = (props: ArticlesProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useDynamicModuleLoader({
        reducers: {
            articlesList: articlesListReducer,
        },
        keepOnUnmount: true,
    });

    useInitialEffect(() => {
        dispatch(initArticlesPage({ searchParams }));
    });

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesListIsLoading);
    const view = useSelector(getArticlesListView);

    const sortField = useSelector(getArticlesListSortField);
    const sortOrder = useSelector(getArticlesListSortOrder);
    const search = useSelector(getArticlesListSearch);
    const sortType = useSelector(getArticlesListSortType);

    const onChangeView = useCallback((view: ArticleListView) => {
        dispatch(articlesListActions.setView(view));
    }, [dispatch]);

    const onChangeFilter = useCallback(() => {
        dispatch(articlesListActions.setPage(1));
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debouncedChangeFilter = useDebounce(onChangeFilter, 300);

    const onSortFieldChange = useCallback((sortField: ArticleFilterField) => {
        dispatch(articlesListActions.setSortField(sortField));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSortOrderChange = useCallback((sortOrder: ArticleFilterOrder) => {
        dispatch(articlesListActions.setSortOrder(sortOrder));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSearch = useCallback(async (search: string) => {
        dispatch(articlesListActions.setSearch(search));
        debouncedChangeFilter();
    }, [debouncedChangeFilter, dispatch]);

    const onSortTypeChange = useCallback((sortType: ArticleType) => {
        dispatch(articlesListActions.setSortType(sortType));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onScrollEnd = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    useEffect(() => {
        setSearchParams((searchParams) => {
            searchParams.set(SORT_FIELD_PARAM, sortField);
            searchParams.set(SORT_ORDER_PARAM, sortOrder);
            searchParams.set(SEARCH_PARAM, search);
            searchParams.set(SORT_TYPE_PARAM, sortType);
            return searchParams;
        });
    }, [search, setSearchParams, sortField, sortOrder, sortType]);

    return (
        <Page
            onScrollEnd={onScrollEnd}
            className={classNames(cls.Articles, {}, [className])}
        >
            <div className={cls.header}>
                <ArticleFilters
                    field={sortField}
                    order={sortOrder}
                    search={search}
                    type={sortType}
                    onFieldChange={onSortFieldChange}
                    onOrderChange={onSortOrderChange}
                    onSearch={onSearch}
                    onTypeChange={onSortTypeChange}
                />

                <ArticleViewSwitcher
                    className={cls.viewSwitcher}
                    view={view}
                    onChangeView={onChangeView}
                />
            </div>

            <ArticlesList
                className={cls.list}
                articles={articles}
                isLoading={isLoading}
                view={view}
            />
        </Page>
    );
};

export default memo(Articles);
