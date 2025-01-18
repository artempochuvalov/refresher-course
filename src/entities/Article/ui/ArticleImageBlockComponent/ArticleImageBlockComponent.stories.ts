import type { Meta, StoryObj } from '@storybook/react';

import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const meta = {
    title: 'entities/articleDetails/ArticleImageBlockComponent',
    component: ArticleImageBlockComponent,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleImageBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
