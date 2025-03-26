import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { Skeleton } from 'shared/ui/Skeleton';
import { TextAtom } from 'shared/ui/TextAtom/TextAtom';

import type { Comment } from '../../model/types';
import cls from './CommentCard.module.scss';

type CommentCardProps = {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
};

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width="32px" height="32px" border="50%" />
                    <Skeleton height="24px" width="100px" />
                </div>

                <div className={cls.text}>
                    <Skeleton width="100%" height="20px" />
                </div>
            </div>
        );
    }

    const { avatar: userAvatar, username } = comment.user;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.header}>
                {userAvatar && <Avatar className={cls.avatar} size={32} src={userAvatar} />}
                <TextAtom title={username} />
            </div>

            <div className={cls.text}>
                <TextAtom text={comment.text} />
            </div>
        </div>
    );
});
