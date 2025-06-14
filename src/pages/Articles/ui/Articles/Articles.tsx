import { ArticleListView, ArticlesList } from 'entities/Article';
import { ArticleFilters } from 'features/Article/ArticleFilters';
import { ArticleViewSwitcher } from 'features/Article/ViewSwitcher';
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

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesListIsLoading);
    const view = useSelector(getArticlesListView);

    useDynamicModuleLoader({
        reducers: {
            articlesList: articlesListReducer,
        },
        keepOnUnmount: true,
    });

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    const onChangeView = useCallback((view: ArticleListView) => {
        dispatch(articlesListActions.setView(view));
    }, [dispatch]);

    const onScrollEnd = useCallback(() => {
        dispatch(fetchNextArticles());
    }, [dispatch]);

    return (
        <Page
            onScrollEnd={onScrollEnd}
            className={classNames(cls.Articles, {}, [className])}
        >
            <div className={cls.header}>
                <ArticleFilters />
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
