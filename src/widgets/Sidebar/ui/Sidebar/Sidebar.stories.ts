import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/providers/theme';

import { Sidebar } from './Sidebar';

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {},
    args: {},
    decorators: [
        StoreDecorator({
            user: {
                authData: {},
            },
        }),
    ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [
        ThemeDecorator(Theme.Light),
    ],
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.Dark),
    ],
};

export const NoLogin: Story = {
    decorators: [
        ThemeDecorator(Theme.Light),
        StoreDecorator({
            user: {
                authData: undefined,
            },
        }),
    ],
};
