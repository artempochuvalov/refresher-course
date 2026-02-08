import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { FeedbackCard } from '@/entities/Feedback';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

import { useArticleFeedback, useLeaveArticleFeedback } from '../api/articleFeedback';

export interface ArticleFeedbackProps {
    articleId: string;
    className?: string;
}

const ArticleFeedback = memo((props: ArticleFeedbackProps) => {
    const { articleId, className } = props;
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const userId = useMemo(() => (
        authData?.id ?? ''
    ), [authData?.id]);

    const { data, isLoading } = useArticleFeedback({
        articleId,
        userId,
    });
    const userFeedback = useMemo(() => data?.[0], [data]);

    const [leaveArticleFeedback] = useLeaveArticleFeedback();
    const handleArticleFeedback = useCallback(async (stars: number, feedback?: string) => {
        try {
            await leaveArticleFeedback({
                userId,
                articleId,
                stars,
                feedback,
            });
        } catch {
            // handle error
        }
    }, [articleId, leaveArticleFeedback, userId]);

    const onAccept = useCallback((stars: number, feedback?: string) => {
        handleArticleFeedback(stars, feedback);
    }, [handleArticleFeedback]);
    const onCancel = useCallback((stars: number) => {
        handleArticleFeedback(stars);
    }, [handleArticleFeedback]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={100} />
        );
    }

    return (
        <FeedbackCard
            currentStars={userFeedback?.stars}
            title={t('Оцените статью')}
            feedbackTitle={t('Оцените статью, это поможет улучшить её качество')}
            hasFeedback
            className={className}
            onAccept={onAccept}
            onCancel={onCancel}
        />
    );
});

export default ArticleFeedback;
