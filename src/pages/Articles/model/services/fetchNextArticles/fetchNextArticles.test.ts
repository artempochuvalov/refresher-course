import { clearAllMocks } from '@storybook/test';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchArticles } from '../fetchArticles/fetchArticles';
import { fetchNextArticles } from './fetchNextArticles';

jest.mock('../fetchArticles/fetchArticles', () => ({
    fetchArticles: jest.fn(() => ({
        meta: {
            requestStatus: 'fulfilled',
        },
    })),
}));

describe('fetchNextArticles.test', () => {
    beforeEach(() => {
        clearAllMocks();
    });

    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticles, {
            articlesList: {
                page: 2,
                view: 'grid',
                hasMore: true,
                isLoading: false,
            },
        });

        const result = await thunk.callThunk();

        expect(fetchArticles).toHaveBeenCalledWith({ page: 2, limit: 9 });
        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('not have been fetched while loading', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticles, {
            articlesList: {
                page: 2,
                view: 'grid',
                hasMore: true,
                isLoading: true,
            },
        });

        await thunk.callThunk();

        expect(fetchArticles).not.toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });

    test('not have been fetched while hasMore is false', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticles, {
            articlesList: {
                page: 2,
                view: 'grid',
                hasMore: false,
                isLoading: false,
            },
        });

        await thunk.callThunk();

        expect(fetchArticles).not.toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
