import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

describe('fetchCommentsByArticleId.test', () => {
    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        const comments: Comment[] = [
            {
                id: '1',
                text: 'Текст комментария',
                user: {
                    id: '1',
                    username: 'username',
                },
            },
        ];
        thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comments);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 502 }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('empty result', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
