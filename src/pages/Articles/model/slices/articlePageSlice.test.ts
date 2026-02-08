import { type Article, ArticleType } from '@/entities/Article';

import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesListSchema } from '../types/articlePageSchema';
import { articlesListReducer } from './articlePageSlice';

describe('articlePageSlice.test', () => {
    test('fetch articles pending', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            error: 'error',
            isLoading: false,
        };

        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                fetchArticles.pending('', {})
            )
        ).toEqual({
            error: undefined,
            isLoading: true,
        });
    });

    test('fetch articles fulfilled', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            isLoading: true,
            hasMore: true,
            entities: {},
            limit: 1,
            ids: [],
        };

        const articles: Article[] = [
            {
                id: '1',
                title: 'Random article',
                subtitle: 'Subtitle',
                user: {
                    id: '1',
                    username: 'random',
                },
                img: '',
                views: 1001,
                createdAt: '2002.02.02',
                type: [ArticleType.IT],
                blocks: [],
            },
            {
                id: '2',
                title: 'Random article',
                subtitle: 'Subtitle',
                user: {
                    id: '1',
                    username: 'random',
                },
                img: '',
                views: 1001,
                createdAt: '2002.02.02',
                type: [ArticleType.IT],
                blocks: [],
            },
        ];

        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                fetchArticles.fulfilled(articles, '', {})
            )
        ).toEqual({
            isLoading: false,
            entities: {
                1: articles[0],
                2: articles[1],
            },
            limit: 1,
            ids: ['1', '2'],
            hasMore: true,
        });
    });

    test('fetch articles fulfilled without articles', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            isLoading: true,
            hasMore: true,
            entities: {},
            ids: [],
        };

        const articles: Article[] = [];

        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                fetchArticles.fulfilled(articles, '', {})
            )
        ).toEqual({
            isLoading: false,
            entities: {},
            ids: [],
            hasMore: false,
        });
    });

    test('fetch articles rejected', () => {
        const state: DeepPartial<ArticlesListSchema> = {
            isLoading: true,
            error: undefined,
            hasMore: true,
            entities: {},
            ids: [],
        };

        expect(
            articlesListReducer(
                state as ArticlesListSchema,
                fetchArticles.rejected(new Error(), '', {}, 'error')
            )
        ).toEqual({
            isLoading: false,
            error: 'error',
            hasMore: false,
            entities: {},
            ids: [],
        });
    });
});
