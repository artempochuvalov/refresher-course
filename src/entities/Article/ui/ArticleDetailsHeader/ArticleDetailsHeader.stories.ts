import type { Meta, StoryObj } from '@storybook/react';

import { ArticleDetailsHeader } from './ArticleDetailsHeader';

const meta = {
    title: 'entities/ArticleDetails/ArticleDetailsHeader',
    component: ArticleDetailsHeader,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleDetailsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        showEditButton: false,
        articleId: '1',
    },
};

export const WithEditButton: Story = {
    args: {
        showEditButton: true,
        articleId: '1',
    },
};
