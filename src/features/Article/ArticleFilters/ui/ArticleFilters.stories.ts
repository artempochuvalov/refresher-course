import type { Meta, StoryObj } from '@storybook/react';

import { ArticleFilters } from './ArticleFilters';

const meta = {
    title: '/ArticleFilters',
    component: ArticleFilters,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
