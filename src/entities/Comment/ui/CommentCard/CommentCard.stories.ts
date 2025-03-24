import type { Meta, StoryObj } from '@storybook/react';

import { CommentCard } from './CommentCard';

const meta = {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {},
    args: {},
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        comment: {
            id: '1',
            text: 'Текст комментария',
            user: {
                id: '1',
                username: 'Автор',
                avatar: 'https://scx2.b-cdn.net/gfx/news/hires/2018/hack.jpg',
            },
        },
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        comment: {
            id: '1',
            text: 'Текст комментария',
            user: {
                id: '1',
                username: 'Автор',
                avatar: 'https://scx2.b-cdn.net/gfx/news/hires/2018/hack.jpg',
            },
        },
    },
};
