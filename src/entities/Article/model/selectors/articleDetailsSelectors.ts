import type { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateSchema) => (
    state.articleDetails?.isLoading ?? false
);
export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;
export const getIfCanEditArticle = (state: StateSchema) => {
    const userId = state.user.authData?.id;
    const articleDetails = state.articleDetails?.data;

    if (!userId && !articleDetails) {
        return false;
    }

    return userId === articleDetails?.user.id;
};
