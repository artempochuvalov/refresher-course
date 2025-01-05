import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import Profile from './Profile';

const meta = {
    title: 'pages/Profile',
    component: Profile,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [
        ThemeDecorator(Theme.Light),
        StoreDecorator({}),
    ],
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.Dark),
        StoreDecorator({}),
    ],
};
