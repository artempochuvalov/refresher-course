import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { Button } from '../../../Button';
import { Dropdown } from './Dropdown';

const meta = {
    title: 'ui/Dropdown',
    component: Dropdown,
    argTypes: {},
    args: {},
    decorators: (Story) => (
        <div style={{ padding: 100 }}>
            <Story />
        </div>
    ),
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const Dark: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
    decorators: [
        ThemeDecorator(Theme.Dark),
    ],
};

export const Disabled: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        disabled: true,
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const WithDisabledItems: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', disabled: true },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const TopLeft: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        anchorPosition: 'top left',
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const TopRight: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        anchorPosition: 'top right',
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const BottomRight: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        anchorPosition: 'bottom right',
        items: [
            { content: 'Item 1', onClick: () => alert('Clicked Item 1') },
            { content: 'Item 2', onClick: () => alert('Clicked Item 2') },
            { content: 'Item 3', onClick: () => alert('Clicked Item 3') },
        ],
    },
};

export const WithLinks: Story = {
    args: {
        trigger: <Button>Open Dropdown</Button>,
        items: [
            { content: 'Google', href: 'https://www.google.com' },
            { content: 'Facebook', href: 'https://www.facebook.com' },
            { content: 'Twitter', href: 'https://www.twitter.com' },
        ],
    },
};
