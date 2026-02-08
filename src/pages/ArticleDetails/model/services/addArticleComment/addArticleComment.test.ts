import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { addArticleComment } from './addArticleComment';

describe('addArticleComment.test', () => {
    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(addArticleComment, {
            user: {
                authData: {
                    id: '1',
                },
            },
            articleDetails: {
                data: {
                    id: '1',
                },
            },
        });

        const text = 'text';
        const comment: Comment = {
            id: '1',
            text,
            user: {
                id: '1',
                username: 'username',
            },
        };
        thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

        const result = await thunk.callThunk(text);

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comment);
    });

    test('try of adding comment with empty text', async () => {
        const thunk = new TestAsyncThunk(addArticleComment, {
            user: {
                authData: {
                    id: '1',
                },
            },
            articleDetails: {
                data: {
                    id: '1',
                },
            },
        });

        const result = await thunk.callThunk('');

        expect(thunk.api.post).not.toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('try of adding comment without being authorized', async () => {
        const thunk = new TestAsyncThunk(addArticleComment, {
            user: {
                authData: undefined,
            },
            articleDetails: {
                data: {
                    id: '1',
                },
            },
        });

        const result = await thunk.callThunk('text');

        expect(thunk.api.post).not.toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(addArticleComment, {
            user: {
                authData: {
                    id: '1',
                },
            },
            articleDetails: {
                data: {
                    id: '1',
                },
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 502 }));

        const result = await thunk.callThunk('text');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
