import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import Main from './Main';

const meta = {
    title: 'pages/Main',
    component: Main,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.Light)],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.Dark)],
};
