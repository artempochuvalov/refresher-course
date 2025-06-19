import { type ArticleListView, ArticlesList, ArticleType } from 'entities/Article';
import {
    type ArticleFilterField,
    type ArticleFilterOrder,
    ArticleFilters
} from 'features/Article/ArticleFilters';
import { ArticleViewSwitcher } from 'features/Article/ViewSwitcher';
import { SEARCH_PARAM, SORT_FIELD_PARAM, SORT_ORDER_PARAM } from 'pages/Articles/constants';
import { fetchArticles } from 'pages/Articles/model/services/fetchArticles/fetchArticles';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'widgets/Page';

import {
    getArticles,
    getArticlesListIsLoading,
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
    getArticlesListSortType,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';
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
        setSearchParams((searchParams) => {
            searchParams.set(SORT_FIELD_PARAM, sortField);
            return searchParams;
        });
        onChangeFilter();
    }, [dispatch, onChangeFilter, setSearchParams]);

    const onSortOrderChange = useCallback((sortOrder: ArticleFilterOrder) => {
        dispatch(articlesListActions.setSortOrder(sortOrder));
        setSearchParams((searchParams) => {
            searchParams.set(SORT_ORDER_PARAM, sortOrder);
            return searchParams;
        });
        onChangeFilter();
    }, [dispatch, onChangeFilter, setSearchParams]);

    const onSearch = useCallback((search: string) => {
        dispatch(articlesListActions.setSearch(search));
        setSearchParams((searchParams) => {
            searchParams.set(SEARCH_PARAM, search);
            return searchParams;
        });
        debouncedChangeFilter();
    }, [debouncedChangeFilter, dispatch, setSearchParams]);

    const onSortTypeChange = useCallback((sortType: ArticleType) => {
        dispatch(articlesListActions.setSortType(sortType));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onScrollEnd = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

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
