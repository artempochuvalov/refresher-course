import { ArticleDetails } from 'entities/Article';
import { AddCommentForm, CommentList } from 'entities/Comment';
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';
import { Page } from 'widgets/Page';

import {
    getArticleCommentAddError,
    getArticleComments,
    getArticleCommentsIsLoading
} from '../../model/selectors/articleCommentsSelectors';
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment';
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slices';

const ArticleDetailsPage = () => {
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
            articleDetailsPage: articleDetailsPageReducer,
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
            <Page>
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Невалидный идентификатор статьи')}
                />
            </Page>
        );
    }

    return (
        <Page>
            <VStack fullWidth gap="32">
                <VStack fullWidth gap="32">
                    <ArticleDetails articleId={id} />

                    <ArticleRecommendationsList />
                </VStack>

                <VStack fullWidth gap="16">
                    <TextAtom size={TextAtomSize.L} title={t('Комментарии')} />

                    <AddCommentForm
                        onSendComment={onSendComment}
                        error={addCommentError}
                    />

                    <CommentList
                        comments={comments}
                        isLoading={areCommentsLoading}
                    />
                </VStack>
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
