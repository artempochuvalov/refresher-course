import { StateSchema } from 'app/providers/StoreProvider';

import {
    getArticleCommentAddError,
    getArticleCommentsFetchError,
    getArticleCommentsIsLoading
} from './articleCommentsSelectors';

describe('getArticleCommentsFetchError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    fetchCommentsError: 'error',
                },
            },
        };
        expect(getArticleCommentsFetchError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsFetchError(state as StateSchema)).toEqual(undefined);
    });
});

describe('getArticleCommentsAddError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    addCommentError: 'error',
                },
            },
        };
        expect(getArticleCommentAddError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentAddError(state as StateSchema)).toEqual(undefined);
    });
});

describe('getArticleCommentsIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    isLoading: true,
                },
            },
        };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(false);
    });
});
