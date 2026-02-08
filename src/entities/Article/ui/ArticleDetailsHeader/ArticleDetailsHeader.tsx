import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '@/shared/constants/routes';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

type ArticleDetailsHeaderProps = {
    showEditButton: boolean;
    articleId?: string;
};

export const ArticleDetailsHeader = memo((props: ArticleDetailsHeaderProps) => {
    const { showEditButton, articleId } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const gotoArticles = useCallback(() => {
        navigate(RoutePaths.Articles);
    }, [navigate]);

    const gotoEditArticle = useCallback(() => {
        navigate(`${RoutePaths.ArticleDetails}${articleId}/edit`);
    }, [navigate, articleId]);

    return (
        <HStack justify="between" fullWidth>
            <Button
                theme={ButtonTheme.Outline}
                onClick={gotoArticles}
            >
                {t('Назад к списку статей')}
            </Button>

            {showEditButton && articleId && (
                <Button
                    theme={ButtonTheme.Outline}
                    onClick={gotoEditArticle}
                >
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
