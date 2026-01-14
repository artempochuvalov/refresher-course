import { ArticlesList } from 'entities/Article';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';

import {
    getArticles,
    getArticlesListIsLoading,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';

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
