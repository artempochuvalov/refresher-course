import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { TextAtom, TextAtomAlign, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import { Article } from '../../model/types/article';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { ArticleCardSkeleton } from '../ArticleCardSkeleton/ArticleCardSkeleton';
import cls from './ArticlesList.module.scss';

export type ArticleListView = 'grid' | 'list';

type ArticlesListProps = {
    articles: Article[];
    view?: ArticleListView;
    isLoading?: boolean;
    className?: string;
};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles,
        view = 'grid',
        isLoading,
        className,
    } = props;

    const { t } = useTranslation('article');

    if (isLoading) {
        const skeletonNumber = view === 'grid' ? 16 : 3;
        return (
            <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
                {Array.from({ length: skeletonNumber }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ArticleCardSkeleton view={view} key={idx} />
                ))}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
            {articles.length
                ? articles.map((article) => (
                    <ArticleCard
                        className={cls.ArticleCard}
                        article={article}
                        key={article.id}
                        view={view}
                    />
                ))
                : (
                    <TextAtom
                        className={cls.notFound}
                        theme={TextAtomTheme.Error}
                        title={t('Статьи не найдены')}
                        align={TextAtomAlign.Center}
                    />
                )}
        </div>
    );
});
