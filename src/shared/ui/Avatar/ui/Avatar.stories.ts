import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
    title: 'ui/Avatar',
    component: Avatar,
    argTypes: {},
    args: {
        src: 'https://4g-inter.net/image/catalog/goods/ai/3d/lion1.jpg',
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Small: Story = {
    args: {
        size: 50,
    },
};
