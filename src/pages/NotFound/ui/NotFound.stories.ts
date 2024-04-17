import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { NotFound } from './NotFound';

const meta = {
    title: 'pages/NotFound',
    component: NotFound,
    argTypes: {},
    args: {},
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.Light)],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.Dark)],
};
