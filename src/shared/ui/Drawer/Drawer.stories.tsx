import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Drawer } from './Drawer';

const meta = {
    title: 'ui/Drawer',
    component: Drawer,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: fn,
        children: <div>Content</div>,
    },
};
