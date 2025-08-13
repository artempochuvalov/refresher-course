import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';

import {
    getArticlesListError,
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListIsMounted,
    getArticlesListLimit,
    getArticlesListPageNum,
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
    getArticlesListSortType,
    getArticlesListView
} from './articlesListSelectors';

describe('getArticlesListIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                isLoading: true,
            },
        };
        expect(getArticlesListIsLoading(state as StateSchema)).toBe(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListIsLoading(state as StateSchema)).toBe(false);
    });
});

describe('getArticlesListError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                error: 'error',
            },
        };
        expect(getArticlesListError(state as StateSchema)).toBe('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListError(state as StateSchema)).toBe(undefined);
    });
});

describe('getArticlesListView.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                view: 'list',
            },
        };
        expect(getArticlesListView(state as StateSchema)).toBe('list');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListView(state as StateSchema)).toBe('grid');
    });
});

describe('getArticlesListPageNum.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                page: 2,
            },
        };
        expect(getArticlesListPageNum(state as StateSchema)).toBe(2);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListPageNum(state as StateSchema)).toBe(1);
    });
});

describe('getArticlesListLimit.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                limit: 3,
            },
        };
        expect(getArticlesListLimit(state as StateSchema)).toBe(3);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListLimit(state as StateSchema)).toBe(undefined);
    });
});

describe('getArticlesListHasMore.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                hasMore: false,
            },
        };
        expect(getArticlesListHasMore(state as StateSchema)).toBe(false);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListHasMore(state as StateSchema)).toBe(true);
    });
});

describe('getArticlesListIsMounted.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                _mounted: true,
            },
        };
        expect(getArticlesListIsMounted(state as StateSchema)).toBe(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListIsMounted(state as StateSchema)).toBe(false);
    });
});

describe('getArticlesListSortField.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                sortField: 'title',
            },
        };
        expect(getArticlesListSortField(state as StateSchema)).toBe('title');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListSortField(state as StateSchema)).toBe('createdAt');
    });
});

describe('getArticlesListSortOrder.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                sortOrder: 'desc',
            },
        };
        expect(getArticlesListSortOrder(state as StateSchema)).toBe('desc');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListSortOrder(state as StateSchema)).toBe('asc');
    });
});

describe('getArticlesListSearch.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                search: 'abc',
            },
        };
        expect(getArticlesListSearch(state as StateSchema)).toBe('abc');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListSearch(state as StateSchema)).toBe(undefined);
    });
});

describe('getArticlesListSortType.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                sortType: ArticleType.IT,
            },
        };
        expect(getArticlesListSortType(state as StateSchema)).toBe('IT');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesListSortType(state as StateSchema)).toBe('ALL');
    });
});
