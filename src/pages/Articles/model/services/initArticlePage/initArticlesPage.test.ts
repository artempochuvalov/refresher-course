import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchNextArticles } from '../fetchNextArticles/fetchNextArticles';
import { initArticlesPage } from './initArticlesPage';

jest.mock('../fetchNextArticles/fetchNextArticles');

describe('initArticlesPage.test', () => {
    test('init page in first time', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesList: {
                _mounted: false,
            },
        });

        const result = await thunk.callThunk();

        expect(fetchNextArticles).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(result.meta.requestStatus).toBe('fulfilled');
    });

    test('init page in second time', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesList: {
                _mounted: true,
            },
        });

        await thunk.callThunk();

        expect(fetchNextArticles).not.toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
