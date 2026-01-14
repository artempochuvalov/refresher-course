import type { Meta, StoryObj } from '@storybook/react';

import { ArticlesInfiniteList } from './ArticlesInfiniteList';

const meta = {
    title: '/ArticlesInfiniteList',
    component: ArticlesInfiniteList,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticlesInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
