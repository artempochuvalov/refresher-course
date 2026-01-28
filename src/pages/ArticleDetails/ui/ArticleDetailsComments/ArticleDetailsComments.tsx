import { AddCommentForm, CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';

import {
    getArticleCommentAddError,
    getArticleComments,
    getArticleCommentsIsLoading
} from '../../model/selectors/articleCommentsSelectors';
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment';
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    articleId?: string;
    className?: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { articleId, className } = props;

    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const areCommentsLoading = useSelector(getArticleCommentsIsLoading);
    const addCommentError = useSelector(getArticleCommentAddError);

    const onSendComment = useCallback(async (text: string) => {
        await dispatch(addArticleComment(text));
    }, [dispatch]);

    useInitialEffect(() => {
        if (!articleId) {
            return;
        }

        dispatch(fetchCommentsByArticleId(articleId));
    });

    return (
        <div className={classNames('', {}, [className])}>
            <AddCommentForm
                onSendComment={onSendComment}
                error={addCommentError}
            />

            <CommentList
                comments={comments}
                isLoading={areCommentsLoading}
            />
        </div>
    );
});
