import { ArticleDetails } from 'entities/Article';
import { AddCommentForm, CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';

import {
    getArticleCommentAddError,
    getArticleComments,
    getArticleCommentsIsLoading
} from '../../model/selectors/articleCommentsSelectors';
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment';
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleCommentsReducer } from '../../model/slices/articleCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

type ArticleDetailsPageProps = {
    className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;

    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string; }>();
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const areCommentsLoading = useSelector(getArticleCommentsIsLoading);

    const addCommentError = useSelector(getArticleCommentAddError);

    const onSendComment = useCallback(async (text: string) => {
        await dispatch(addArticleComment(text));
    }, [dispatch]);

    useDynamicModuleLoader({
        reducers: {
            articleComments: articleCommentsReducer,
        },
    });

    useInitialEffect(() => {
        if (!id) {
            return;
        }

        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <Page className={cls.noData}>
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Невалидный идентификатор статьи')}
                />
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails articleId={id} />

            <div className={cls.commentsBlock}>
                <TextAtom size={TextAtomSize.L} title={t('Комментарии')} />

                <AddCommentForm
                    className={cls.addCommentForm}
                    onSendComment={onSendComment}
                    error={addCommentError}
                />

                <CommentList
                    className={cls.comments}
                    comments={comments}
                    isLoading={areCommentsLoading}
                />
            </div>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
