import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import type { Comment } from '../../model/types';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

type CommentListProps = {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
};

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props;

    const { t } = useTranslation('comments');

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                {Array.from({ length: 5 }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <CommentCard key={idx} isLoading />
                ))}
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments.length
                ? comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                    />
                ))
                : <TextAtom text={t('Нет комментариев')} />}
        </div>
    );
});
