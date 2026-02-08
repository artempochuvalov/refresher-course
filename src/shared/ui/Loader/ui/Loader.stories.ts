import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/providers/theme';

import { Loader } from './Loader';

const meta = {
    title: 'ui/Loader',
    component: Loader,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [ThemeDecorator(Theme.Light)],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.Dark)],
};
