import { ArticlesList } from 'entities/Article';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';

import { getArticles, getArticlesListIsLoading } from '../../model/selectors/articlesListSelectors';
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

    useDynamicModuleLoader({
        reducers: {
            articlesList: articlesListReducer,
        },
    });

    useInitialEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlesListActions.initView());
    });

    return (
        <div className={classNames(cls.Articles, {}, [className])}>
            <ArticlesList articles={articles} isLoading={isLoading} />
        </div>
    );
};

export default memo(Articles);
