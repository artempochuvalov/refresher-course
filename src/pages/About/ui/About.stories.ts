import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import About from './About';

const meta = {
    title: 'pages/About',
    component: About,
    argTypes: {},
    args: {},
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.Light)],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.Dark)],
};
