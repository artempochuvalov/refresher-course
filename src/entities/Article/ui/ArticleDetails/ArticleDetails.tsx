import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    getIfCanEditArticle
} from 'entities/Article';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Calendar, ViewEye } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar';
import { Skeleton } from 'shared/ui/Skeleton';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
import {
    ArticleImageBlockComponent
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

type ArticleDetailsProps = {
    className?: string;
    articleId: string;
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;

    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const articleData = useSelector(getArticleDetailsData);
    const ifCanEditArticle = useSelector(getIfCanEditArticle);

    useDynamicModuleLoader({
        reducers: {
            articleDetails: articleDetailsReducer,
        },
    });

    useInitialEffect(() => {
        dispatch(fetchArticleById(articleId));
    });

    const renderArticleBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.TEXT: {
                return (
                    <ArticleTextBlockComponent
                        key={block.id}
                        block={block}
                    />
                );
            }
            case ArticleBlockType.CODE: {
                return (
                    <ArticleCodeBlockComponent
                        key={block.id}
                        block={block}
                    />
                );
            }
            case ArticleBlockType.IMAGE: {
                return (
                    <ArticleImageBlockComponent
                        key={block.id}
                        block={block}
                    />
                );
            }
            default: {
                return null;
            }
        }
    }, []);

    if (isLoading) {
        return (
            <>
                <ArticleDetailsHeader showEditButton={false} />
                <div className={cls.skeletons}>
                    <Skeleton
                        className={cls.skeletonAvatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                    <Skeleton className={cls.skeletonTitle} width={670} height={32} />
                    <Skeleton className={cls.skeletonDescription} width={400} height={32} />
                    <Skeleton className={cls.skeleton} width="100%" height={232} />
                    <Skeleton className={cls.skeleton} width="100%" height={232} />
                </div>
            </>
        );
    }

    if (error || !articleData) {
        return (
            <>
                <ArticleDetailsHeader showEditButton={false} />
                <div className={cls.error}>
                    <TextAtom
                        align={TextAtomAlign.Center}
                        theme={TextAtomTheme.Error}
                        title={t('Не удалось загрузить статью')}
                    />
                </div>
            </>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
            <ArticleDetailsHeader
                showEditButton={ifCanEditArticle}
                articleId={articleData.id}
            />

            <div className={cls.avatarWrapper}>
                <Avatar size={200} src={articleData.img} />
            </div>

            <TextAtom
                className={cls.articleTitle}
                title={articleData.title}
                size={TextAtomSize.L}
            />
            <TextAtom text={articleData.subtitle} size={TextAtomSize.L} />

            <div className={cls.articleMetaBlock}>
                <div className={cls.articleMetaItem}>
                    <ViewEye className={cls.articleMetaIcon} />
                    <TextAtom text={String(articleData.views)} />
                </div>
                <div className={cls.articleMetaItem}>
                    <Calendar className={cls.articleMetaIcon} />
                    <TextAtom text={String(articleData.createdAt)} />
                </div>
            </div>

            {articleData.blocks.map(renderArticleBlock)}
        </div>
    );
});
