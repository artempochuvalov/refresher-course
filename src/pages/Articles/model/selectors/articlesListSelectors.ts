import { StateSchema } from 'app/providers/StoreProvider';

import { articlesAdapter } from '../slices/articlePageSlice';

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesList ?? articlesAdapter.getInitialState()
);
export const getArticlesListIsLoading = (state: StateSchema) => (
    state.articlesList?.isLoading ?? false
);
export const getArticlesListError = (state: StateSchema) => (
    state.articlesList?.error
);
export const getArticlesListView = (state: StateSchema) => (
    state.articlesList?.view ?? 'grid'
);
