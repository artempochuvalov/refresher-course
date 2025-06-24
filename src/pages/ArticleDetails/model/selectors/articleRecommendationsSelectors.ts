import { StateSchema } from 'app/providers/StoreProvider';

import { recommendationsAdapter } from '../slices/articleRecommendations';

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations ?? recommendationsAdapter.getInitialState()
);
export const getArticleRecommendationsIsLoading = (state: StateSchema) => (
    state.articleDetailsPage?.recommendations?.isLoading ?? false
);
export const getArticleRecommendationsError = (state: StateSchema) => (
    state.articleDetailsPage?.recommendations?.error
);
