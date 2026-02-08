import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { TextAtom, TextAtomAlign, TextAtomTheme } from '@/shared/ui/TextAtom/TextAtom';

import { Article, ArticleListView } from '../../model/types/article';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { ArticleCardSkeleton } from '../ArticleCardSkeleton/ArticleCardSkeleton';
import cls from './ArticlesList.module.scss';

type ArticlesListProps = {
    articles: Article[];
    view?: ArticleListView;
    isLoading?: boolean;
    className?: string;
    target?: HTMLAttributeAnchorTarget;
};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        articles,
        view = 'grid',
        isLoading,
        target,
        className,
    } = props;

    const { t } = useTranslation('article');

    const skeletonList = useMemo(() => {
        const skeletonNumber = view === 'grid' ? 16 : 3;
        return (
            <>
                {Array.from({ length: skeletonNumber }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ArticleCardSkeleton className={cls.ArticleCard} view={view} key={idx} />
                ))}
            </>
        );
    }, [view]);

    return (
        <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
            {articles.length > 0 && articles.map((article) => (
                <ArticleCard
                    article={article}
                    view={view}
                    target={target}
                    key={article.id}
                    className={cls.ArticleCard}
                />
            ))}
            {isLoading && skeletonList}
            {articles.length === 0 && !isLoading && (
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
