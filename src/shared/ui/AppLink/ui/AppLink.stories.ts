import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
    title: 'ui/AppLink',
    component: AppLink,
    argTypes: {},
    args: {
        children: 'Ссылка',
        to: '#',
    },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        theme: AppLinkTheme.Primary,
    },
};

export const PrimaryDark: Story = {
    args: {
        theme: AppLinkTheme.Primary,
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};

export const Secondary: Story = {
    args: {
        theme: AppLinkTheme.Secondary,
    },
};

export const SecondaryDark: Story = {
    args: {
        theme: AppLinkTheme.Secondary,
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};

export const Red: Story = {
    args: {
        theme: AppLinkTheme.Red,
    },
};

export const RedDark: Story = {
    args: {
        theme: AppLinkTheme.Red,
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};
