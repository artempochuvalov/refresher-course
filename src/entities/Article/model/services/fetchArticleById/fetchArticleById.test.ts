import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ArticleBlockType, ArticleType } from '../../constants';
import { Article } from '../../types/article';
import { fetchArticleById } from './fetchArticleById';

describe('fetchArticleById.test', () => {
    test('success fetch', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        const article: Article = {
            id: '1',
            user: {
                id: '1',
                username: 'admin',
            },
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
        thunk.api.get.mockReturnValue(Promise.resolve({ data: article }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(article);
    });

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        thunk.api.get.mockReturnValue(Promise.resolve({ status: 502 }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });

    test('empty result', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);

        thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
