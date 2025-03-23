import { StateSchema } from 'app/providers/StoreProvider';

import { Article, ArticleBlockType, ArticleType } from '../types/article';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from './articleDetailsSelectors';

describe('getArticleDetailsData.test', () => {
    test('should return value', () => {
        const article: Article = {
            id: '1',
            type: [ArticleType.IT],
            title: 'Заголовок',
            subtitle: 'Подзаголовок',
            img: 'https://www.image.com',
            views: 2002,
            createdAt: '2022.02.18',
            blocks: [
                {
                    id: '1',
                    type: ArticleBlockType.TEXT,
                    title: 'Заголовок',
                    paragraphs: [],
                },
            ],
        };

        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: article,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(article);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
});

describe('getArticleDetailsError.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});

describe('getArticleDetailsIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });
});
