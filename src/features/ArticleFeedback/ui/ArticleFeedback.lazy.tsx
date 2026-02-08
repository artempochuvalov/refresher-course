import { FC, lazy, Suspense } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';

import { ArticleFeedbackProps } from './ArticleFeedback';

const ArticleFeedbackLazy = lazy<FC<ArticleFeedbackProps>>(() => import('./ArticleFeedback'));

export const ArticleFeedbackAsync = (props: ArticleFeedbackProps) => (
    <Suspense fallback={<Skeleton width="100%" height={100} />}>
        <ArticleFeedbackLazy {...props} />
    </Suspense>
);
