import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { articleCommentsReducer } from 'pages/ArticleDetails/model/slices/articleCommentsSlice';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';

import {
    getArticleComments,
    getArticleCommentsIsLoading
} from '../../model/selectors/articleCommentsSelectors';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId';
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
            <div className={cls.noData}>
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Невалидный идентификатор статьи')}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <ArticleDetails articleId={id} />

            <div className={cls.commentsBlock}>
                <TextAtom size={TextAtomSize.L} title={t('Комментарии')} />

                <CommentList
                    className={cls.comments}
                    comments={comments}
                    isLoading={areCommentsLoading}
                />
            </div>
        </div>
    );
};

export default memo(ArticleDetailsPage);
