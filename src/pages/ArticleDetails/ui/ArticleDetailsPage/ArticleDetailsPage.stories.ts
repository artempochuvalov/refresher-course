import type { Meta, StoryObj } from '@storybook/react';

import ArticleDetailsPage from './ArticleDetailsPage';

const meta = {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
