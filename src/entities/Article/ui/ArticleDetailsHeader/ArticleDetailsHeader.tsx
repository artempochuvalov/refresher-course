import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/constants/routes';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './ArticleDetailsHeader.module.scss';

type ArticleDetailsHeaderProps = {
    showEditButton: boolean;
    articleId?: string;
    className?: string;
};

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
    const { showEditButton, articleId, className } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const gotoArticles = useCallback(() => {
        navigate(RoutePaths.Articles);
    }, [navigate]);

    const gotoEditArticle = useCallback(() => {
        navigate(`${RoutePaths.ArticleDetails}${articleId}/edit`);
    }, [navigate, articleId]);

    return (
        <div className={classNames(cls.ArticleDetailsHeader, {}, [className])}>
            <Button
                className={cls.backButton}
                theme={ButtonTheme.Outline}
                onClick={gotoArticles}
            >
                {t('Назад к списку статей')}
            </Button>

            {showEditButton && articleId && (
                <Button
                    className={cls.editButton}
                    theme={ButtonTheme.Outline}
                    onClick={gotoEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </div>
    );
});
