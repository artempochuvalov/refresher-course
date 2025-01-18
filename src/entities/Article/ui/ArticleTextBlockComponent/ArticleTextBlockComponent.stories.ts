import type { Meta, StoryObj } from '@storybook/react';

import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

const meta = {
    title: 'entities/articleDetails/ArticleTextBlockComponent',
    component: ArticleTextBlockComponent,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleTextBlockComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
