import { StateSchema } from 'app/providers/StoreProvider';

import {
    getArticlesListError,
    getArticlesListHasMore,
    getArticlesListIsLoading,
    getArticlesListLimit,
    getArticlesListPageNum,
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
    test('should return 3 with list view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                view: 'list',
            },
        };
        expect(getArticlesListLimit(state as StateSchema)).toBe(3);
    });

    test('should return 9 with grid view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesList: {
                view: 'grid',
            },
        };
        expect(getArticlesListLimit(state as StateSchema)).toBe(9);
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
