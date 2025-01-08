import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta = {
    title: 'ui/Avatar',
    component: Avatar,
    argTypes: {},
    args: {
        // eslint-disable-next-line max-len
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s',
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
