import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from 'entities/Article/model/selectors/articleDetailsSelectors';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Calendar, ViewEye } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
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
import {
    ArticleImageBlockComponent
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

type ArticleDetailsProps = {
    className?: string;
    articleId?: string;
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;

    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const articleData = useSelector(getArticleDetailsData);

    useDynamicModuleLoader({
        reducers: {
            articleDetails: articleDetailsReducer,
        },
    });

    useEffect(() => {
        if (!articleId || __PROJECT__ === 'storybook') return;

        dispatch(fetchArticleById(articleId));
    }, [dispatch, articleId]);

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

    if (!articleId) {
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

    if (isLoading) {
        return (
            <div className={cls.skeletons}>
                <Skeleton className={cls.skeletonAvatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.skeletonTitle} width={670} height={32} />
                <Skeleton className={cls.skeletonDescription} width={400} height={32} />
                <Skeleton className={cls.skeleton} width="100%" height={232} />
                <Skeleton className={cls.skeleton} width="100%" height={232} />
            </div>
        );
    }

    if (error || !articleData) {
        return (
            <div className={cls.error}>
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Не удалось загрузить статью')}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
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
