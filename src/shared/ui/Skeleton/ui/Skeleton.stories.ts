import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { Skeleton } from './Skeleton';

const meta = {
    title: 'ui/Skeleton',
    component: Skeleton,
    argTypes: {},
    args: {},
    parameters: {
        loki: {
            skip: true,
        },
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Circle: Story = {
    args: {
        width: 100,
        height: 100,
        border: '50%',
    },
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.Dark)],
};
