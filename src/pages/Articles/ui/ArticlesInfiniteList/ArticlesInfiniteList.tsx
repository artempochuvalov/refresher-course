import { memo } from 'react';
import { useSelector } from 'react-redux';

import { ArticlesList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames';

import {
    getArticlesListIsLoading,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';
import { getArticles } from '../../model/slices/articlePageSlice';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
    const { className } = props;

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesListIsLoading);
    const view = useSelector(getArticlesListView);

    return (
        <ArticlesList
            className={classNames('', {}, [className])}
            articles={articles}
            isLoading={isLoading}
            view={view}
        />
    );
});
