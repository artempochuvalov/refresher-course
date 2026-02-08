import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../../Button';
import { Popover } from './Popover';

const meta = {
    title: 'ui/Popover',
    component: Popover,
    argTypes: {},
    args: {},
    decorators: [
        (Story) => (
            <div style={{ padding: '100px' }}><Story /></div>
        ),
    ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
    },
};

export const Disabled: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
        disabled: true,
    },
};

export const TopLeft: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
        anchorPosition: 'top left',
    },
};

export const TopRight: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
        anchorPosition: 'top right',
    },
};

export const BottomLeft: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
        anchorPosition: 'bottom left',
    },
};

export const BottomRight: Story = {
    args: {
        trigger: <Button>Open</Button>,
        children: <div>content</div>,
        anchorPosition: 'bottom right',
    },
};
