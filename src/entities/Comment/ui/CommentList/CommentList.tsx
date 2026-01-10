import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import type { Comment } from '../../model/types';
import { CommentCard } from '../CommentCard/CommentCard';

type CommentListProps = {
    comments: Comment[];
    isLoading?: boolean;
};

export const CommentList = memo((props: CommentListProps) => {
    const { comments, isLoading } = props;

    const { t } = useTranslation('comments');

    if (isLoading) {
        return (
            <VStack gap="16" fullWidth>
                {Array.from({ length: 5 }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <CommentCard key={idx} isLoading />
                ))}
            </VStack>
        );
    }

    return (
        <VStack gap="16" fullWidth>
            {comments.length
                ? comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                    />
                ))
                : <TextAtom text={t('Нет комментариев')} />}
        </VStack>
    );
});
