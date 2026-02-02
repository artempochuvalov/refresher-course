import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { Article, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';

const meta = {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {},
    args: {},
    parameters: {
        loki: {
            skip: true,
        },
    },
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const articleTemplate: Article = {
    id: '1',
    user: {
        id: '1',
        username: 'user',
    },
    title: 'Article',
    subtitle: 'Cool article',
    img: '',
    views: 123,
    createdAt: '2026.01.01',
    type: [ArticleType.ECONOMICS],
    blocks: [],
};

export const Default: Story = {
    args: {},
    parameters: {
        msw: {
            handlers: [
                http.get(
                    `${__API__}/articles?limit=5`,
                    () => HttpResponse.json([
                        { ...articleTemplate, id: '1' },
                        { ...articleTemplate, id: '2' },
                        { ...articleTemplate, id: '3' },
                        { ...articleTemplate, id: '4' },
                        { ...articleTemplate, id: '5' },
                    ])
                ),
            ],
        },
    },
};
