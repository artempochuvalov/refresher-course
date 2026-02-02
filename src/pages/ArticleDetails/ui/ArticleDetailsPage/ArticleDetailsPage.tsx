import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import {
    TextAtom,
    TextAtomAlign,
    TextAtomSize,
    TextAtomTheme
} from '@/shared/ui/TextAtom/TextAtom';
import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

const ArticleDetailsPage = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string; }>();

    useDynamicModuleLoader({
        reducers: {
            articleDetailsPage: articleDetailsPageReducer,
        },
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

                    <ArticleDetailsComments articleId={id} />
                </VStack>
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
