import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button, ButtonSize, ButtonTheme } from './Button';

const meta = {
    title: 'ui/Button',
    component: Button,
    argTypes: {},
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Кнопка',
    },
};

export const Blank: Story = {
    args: {
        theme: ButtonTheme.Blank,
        children: 'Кнопка',
    },
};

export const Outline: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: 'Кнопка',
    },
};

export const OutlineDark: Story = {
    name: 'Outline/Dark',
    args: {
        theme: ButtonTheme.Outline,
        children: 'Кнопка',
    },
};

export const OutlineL: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: 'Кнопка',
        size: ButtonSize.L,
    },
};

export const OutlineXL: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: 'Кнопка',
        size: ButtonSize.XL,
    },
};

export const Background: Story = {
    args: {
        theme: ButtonTheme.Background,
        children: 'Кнопка',
    },
};

export const BackgroundInverted: Story = {
    args: {
        theme: ButtonTheme.BackgroundInverted,
        children: 'Кнопка',
    },
};

export const Squared: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: '+',
        squared: true,
    },
};

export const SquaredL: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: '+',
        squared: true,
        size: ButtonSize.L,
    },
};

export const SquaredXL: Story = {
    args: {
        theme: ButtonTheme.Outline,
        children: '+',
        squared: true,
        size: ButtonSize.XL,
    },
};