import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

export const getArticlesListIsLoading = (state: StateSchema) => (
    state.articlesList?.isLoading ?? false
);
export const getArticlesListError = (state: StateSchema) => (
    state.articlesList?.error
);
export const getArticlesListView = (state: StateSchema) => (
    state.articlesList?.view ?? 'grid'
);
export const getArticlesListPageNum = (state: StateSchema) => (
    state.articlesList?.page ?? 1
);
export const getArticlesListLimit = (state: StateSchema) => (
    state.articlesList?.limit
);
export const getArticlesListHasMore = (state: StateSchema) => (
    state.articlesList?.hasMore ?? true
);
export const getArticlesListIsMounted = (state: StateSchema) => (
    state.articlesList?._mounted ?? false
);
export const getArticlesListSortField = (state: StateSchema) => (
    state.articlesList?.sortField ?? 'createdAt'
);
export const getArticlesListSortOrder = (state: StateSchema) => (
    state.articlesList?.sortOrder ?? 'asc'
);
export const getArticlesListSearch = (state: StateSchema) => (
    state.articlesList?.search ?? ''
);
export const getArticlesListSortType = (state: StateSchema) => (
    state.articlesList?.sortType ?? ArticleType.ALL
);
