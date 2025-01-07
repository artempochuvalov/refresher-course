import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';
import img from './storybook.png';

const meta = {
    title: 'ui/Avatar',
    component: Avatar,
    argTypes: {},
    args: {
        src: img,
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
