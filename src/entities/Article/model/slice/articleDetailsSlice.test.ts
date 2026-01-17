import { ArticleBlockType, ArticleType } from '../constants';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';

describe('articleDetailsSlice.test', () => {
    test('fetch profile by id pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            error: 'error',
            isLoading: false,
        };
        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.pending('1', '')
            )
        ).toEqual({
            error: undefined,
            isLoading: true,
        });
    });

    test('fetch profile by id fullfilled', () => {
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

        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            data: undefined,
        };
        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled(article, '1', '')
            )
        ).toEqual({
            isLoading: false,
            data: article,
        });
    });
});
