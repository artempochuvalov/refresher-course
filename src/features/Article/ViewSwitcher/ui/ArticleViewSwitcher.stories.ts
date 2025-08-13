import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { ArticleViewSwitcher } from './ArticleViewSwitcher';

const meta = {
    title: 'features/ArticleViewSwitcher',
    component: ArticleViewSwitcher,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ArticleViewSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridSelected: Story = {
    args: {
        view: 'grid',
        onChangeView: fn,
    },
};

export const ListSelected: Story = {
    args: {
        view: 'list',
        onChangeView: fn,
    },
};

export const Dark: Story = {
    args: {
        view: 'grid',
        onChangeView: fn,
    },
    decorators: [
        ThemeDecorator(Theme.Dark),
    ],
};

export const Orange: Story = {
    args: {
        view: 'grid',
        onChangeView: fn,
    },
    decorators: [
        ThemeDecorator(Theme.Orange),
    ],
};
