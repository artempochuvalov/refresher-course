import { ArticlesList } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { VStack } from 'shared/ui/Stack';
import { TextAtom, TextAtomSize } from 'shared/ui/TextAtom/TextAtom';

import { useArticleRecommendationsList } from '../api/articleRecommendationsList';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    const {
        data: recommendations,
        isLoading,
    } = useArticleRecommendationsList();

    return (
        <VStack className={classNames('', {}, [className])} fullWidth gap="16">
            <TextAtom
                size={TextAtomSize.L}
                text={t('Мы рекоммендуем')}
            />

            <ArticlesList
                articles={recommendations ?? []}
                isLoading={isLoading}
                target="_blank"
                className={cls.recommendations}
            />
        </VStack>
    );
});
