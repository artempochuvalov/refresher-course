import { type ArticleListView, ArticlesList } from 'entities/Article';
import {
    type ArticleFilterField,
    type ArticleFilterOrder,
    ArticleFilters
} from 'features/Article/ArticleFilters';
import { ArticleViewSwitcher } from 'features/Article/ViewSwitcher';
import { fetchArticles } from 'pages/Articles/model/services/fetchArticles/fetchArticles';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'widgets/Page';

import {
    getArticles,
    getArticlesListIsLoading,
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
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

    useDynamicModuleLoader({
        reducers: {
            articlesList: articlesListReducer,
        },
        keepOnUnmount: true,
    });

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesListIsLoading);
    const view = useSelector(getArticlesListView);

    const sortField = useSelector(getArticlesListSortField);
    const sortOrder = useSelector(getArticlesListSortOrder);
    const search = useSelector(getArticlesListSearch);

    const onChangeView = useCallback((view: ArticleListView) => {
        dispatch(articlesListActions.setView(view));
    }, [dispatch]);

    const onChangeFilter = useCallback(() => {
        dispatch(articlesListActions.setPage(1));
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const onSortFieldChange = useCallback((sortField: ArticleFilterField) => {
        dispatch(articlesListActions.setSortField(sortField));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSortOrderChange = useCallback((sortOrder: ArticleFilterOrder) => {
        dispatch(articlesListActions.setSortOrder(sortOrder));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSearch = useCallback((search: string) => {
        dispatch(articlesListActions.setSearch(search));
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
                    onFieldChange={onSortFieldChange}
                    onOrderChange={onSortOrderChange}
                    onSearch={onSearch}
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
