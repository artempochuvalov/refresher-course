import type { Meta, StoryObj } from '@storybook/react';

import { ArticleCardSkeleton } from './ArticleCardSkeleton';

const meta = {
    title: 'entities/ArticleCardSkeleton',
    component: ArticleCardSkeleton,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridView: Story = {
    args: {
        view: 'grid',
    },
};

export const ListView: Story = {
    args: {
        view: 'list',
    },
};
