import type { Meta, StoryObj } from '@storybook/react';

import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const meta = {
    title: 'entities/articleDetails/ArticleCodeBlockComponent',
    component: ArticleCodeBlockComponent,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleCodeBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
