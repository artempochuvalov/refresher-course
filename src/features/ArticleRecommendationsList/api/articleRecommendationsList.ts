import type { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

import { RECOMMENDATIONS_SIZE } from '../constants';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<
            Article[],
            void
        >({
            query: () => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _limit: RECOMMENDATIONS_SIZE,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = (
    recommendationsApi.useGetArticleRecommendationsListQuery
);
