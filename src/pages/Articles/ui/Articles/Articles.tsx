import { ArticleListView, ArticlesList } from 'entities/Article';
import { ArticleViewSwitcher } from 'features/ArticlesViewSwitcher';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';

import {
    getArticles,
    getArticlesListIsLoading,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';
import { fetchArticles } from '../../model/services/fetchArticles';
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
    });

    useInitialEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlesListActions.initView());
    });

    const onChangeView = useCallback((view: ArticleListView) => {
        dispatch(articlesListActions.setView(view));
    }, [dispatch]);

    return (
        <div className={classNames(cls.Articles, {}, [className])}>
            <ArticleViewSwitcher view={view} onChangeView={onChangeView} />
            <ArticlesList articles={articles} isLoading={isLoading} view={view} />
        </div>
    );
};

export default memo(Articles);
