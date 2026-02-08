import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/providers/theme';

import { Navbar } from './Navbar';

const meta = {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [
        StoreDecorator({}),
    ],
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.Dark),
        StoreDecorator({}),
    ],
};

export const LogedIn: Story = {
    decorators: [
        StoreDecorator({
            user: {
                authData: {},
            },
        }),
    ],
};
