import {
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from 'entities/Article/model/selectors/articleDetailsSelectors';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetails.slice';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { Skeleton } from 'shared/ui/Skeleton';
import { TextAtom, TextAtomAlign, TextAtomTheme } from 'shared/ui/TextAtom/TextAtom';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
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

    useDynamicModuleLoader({
        reducers: {
            articleDetails: articleDetailsReducer,
        },
    });

    useEffect(() => {
        if (!articleId) return;

        dispatch(fetchArticleById(articleId));
    }, [dispatch, articleId]);

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

    if (error) {
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
            <div>{t('ARTICLE DETAILS')}</div>
        </div>
    );
});
