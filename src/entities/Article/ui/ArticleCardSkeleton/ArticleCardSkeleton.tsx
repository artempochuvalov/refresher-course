import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ArticleListView } from '../../model/types/article';
import cls from './ArticleCardSkeleton.module.scss';

type ArticleCardSkeletonProps = {
    view: ArticleListView;
    className?: string;
};

export const ArticleCardSkeleton = memo((props: ArticleCardSkeletonProps) => {
    const { view, className } = props;

    if (view === 'grid') {
        return (
            <Card className={classNames(cls.ArticleCard, {}, [className, cls[view]])}>
                <Skeleton width="100%" height="200px" />

                <div className={cls.meta}>
                    <Skeleton width="120px" height="20px" />
                    <Skeleton width="40px" height="20px" />
                </div>

                <Skeleton className={cls.title} width="100%" height="20px" />
            </Card>
        );
    }

    return (
        <Card className={classNames(cls.ArticleCard, {}, [className, cls[view]])}>
            <div className={cls.header}>
                <div className={cls.userInfo}>
                    <Skeleton width="32px" height="32px" border="50%" />
                    <Skeleton height="20px" width="100px" />
                </div>

                <Skeleton height="20px" width="100px" />
            </div>

            <Skeleton className={cls.title} width="160px" height="40px" />

            <Skeleton className={cls.categories} height="20px" width="120px" />

            <Skeleton className={cls.image} width="100%" height="200px" />

            <Skeleton className={cls.summary} width="100%" height="80px" />
            <Skeleton className={cls.summary} width="100%" height="40px" />

            <div className={cls.footer}>
                <Skeleton height="40px" width="160px" />

                <Skeleton height="40px" width="64px" className={cls.views} />
            </div>
        </Card>
    );
});
