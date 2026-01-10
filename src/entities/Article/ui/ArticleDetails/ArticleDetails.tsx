import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Calendar, ViewEye } from 'shared/assets/icons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Avatar } from 'shared/ui/Avatar';
import { Skeleton } from 'shared/ui/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from 'shared/ui/TextAtom/TextAtom';

import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    getIfCanEditArticle
} from '../../model/selectors/articleDetailsSelectors';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
import {
    ArticleImageBlockComponent
} from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

type ArticleDetailsProps = {
    articleId: string;
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { articleId } = props;

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
            <VStack align="center" fullWidth gap="32">
                <ArticleDetailsHeader showEditButton={false} />
                <VStack gap="32" fullWidth>
                    <HStack justify="center" fullWidth>
                        <Skeleton
                            width={200}
                            height={200}
                            border="50%"
                        />
                    </HStack>

                    <VStack fullWidth gap="16">
                        <Skeleton width={670} height={32} />
                        <Skeleton width={400} height={32} />
                    </VStack>

                    <Skeleton width="100%" height={232} />
                    <Skeleton width="100%" height={232} />
                </VStack>
            </VStack>
        );
    }

    if (error || !articleData) {
        return (
            <VStack align="center" fullWidth gap="32">
                <ArticleDetailsHeader showEditButton={false} />
                <TextAtom
                    align={TextAtomAlign.Center}
                    theme={TextAtomTheme.Error}
                    title={t('Не удалось загрузить статью')}
                />
            </VStack>
        );
    }

    return (
        <VStack fullWidth gap="32">
            <ArticleDetailsHeader
                showEditButton={ifCanEditArticle}
                articleId={articleData.id}
            />

            <VStack fullWidth>
                <HStack justify="center" fullWidth>
                    <Avatar size={200} src={articleData.img} />
                </HStack>

                <VStack gap="32" fullWidth>
                    <TextAtom
                        title={articleData.title}
                        size={TextAtomSize.L}
                    />

                    <VStack gap="8" fullWidth>
                        <TextAtom text={articleData.subtitle} size={TextAtomSize.L} />

                        <VStack gap="8">
                            <HStack gap="8" justify="center">
                                <ViewEye className={cls.articleMetaIcon} />
                                <TextAtom text={String(articleData.views)} />
                            </HStack>
                            <HStack gap="8" justify="center">
                                <Calendar className={cls.articleMetaIcon} />
                                <TextAtom text={String(articleData.createdAt)} />
                            </HStack>
                        </VStack>

                        {articleData.blocks.map(renderArticleBlock)}
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    );
});
