import type { Meta, StoryObj } from '@storybook/react';

import { ArticleDetailsComments } from './ArticleDetailsComments';

const meta = {
    title: '/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleDetailsComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
