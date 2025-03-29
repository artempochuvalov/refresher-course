import { Comment } from 'entities/Comment';

import { addArticleComment } from '../services/addArticleComment/addArticleComment';
import {
    fetchCommentsByArticleId
} from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleCommentsSchema } from '../types/articleCommentsSchema';
import { articleCommentsReducer } from './articleCommentsSlice';

describe('articleCommentsSlice.test', () => {
    test('fetch article comments pending', () => {
        const state: DeepPartial<ArticleCommentsSchema> = {
            fetchCommentsError: 'error',
            isLoading: false,
        };
        expect(
            articleCommentsReducer(
                state as ArticleCommentsSchema,
                fetchCommentsByArticleId.pending('1', '')
            )
        ).toEqual({
            fetchCommentsError: undefined,
            isLoading: true,
        });
    });

    test('fetch article comments fulfilled', () => {
        const state: DeepPartial<ArticleCommentsSchema> = {
            isLoading: true,
            entities: {},
            ids: [],
        };

        const comments: Comment[] = [
            {
                id: '1',
                text: 'text',
                user: {
                    id: '1',
                    username: 'username',
                },
            },
        ];
        expect(
            articleCommentsReducer(
                state as ArticleCommentsSchema,
                fetchCommentsByArticleId.fulfilled(comments, '1', '')
            )
        ).toEqual({
            isLoading: false,
            entities: {
                1: comments[0],
            },
            ids: ['1'],
        });
    });

    test('add article comment pending', () => {
        const state: DeepPartial<ArticleCommentsSchema> = {
            addCommentError: 'error',
        };

        expect(
            articleCommentsReducer(
                state as ArticleCommentsSchema,
                addArticleComment.pending('text', '')
            )
        ).toEqual({
            addArticleComment: undefined,
        });
    });
});
