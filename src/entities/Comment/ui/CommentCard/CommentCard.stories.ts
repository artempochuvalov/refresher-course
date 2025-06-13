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
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s',
            },
        },
    },
};

export const Loading: Story = {
    parameters: {
        loki: { skip: true },
    },
    args: {
        isLoading: true,
        comment: {
            id: '1',
            text: 'Текст комментария',
            user: {
                id: '1',
                username: 'Автор',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s',
            },
        },
    },
};
