import { StateSchema } from 'app/providers/StoreProvider';

import { recommendationsAdapter } from '../slices/articleRecommendations';

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleRecommendations ?? recommendationsAdapter.getInitialState()
);
export const getArticleRecommendationsIsLoading = (state: StateSchema) => (
    state.articleRecommendations?.isLoading ?? false
);
export const getArticleRecommendationsError = (state: StateSchema) => (
    state.articleRecommendations?.error
);
