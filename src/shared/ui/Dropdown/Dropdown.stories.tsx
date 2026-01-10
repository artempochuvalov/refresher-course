import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Dropdown } from './Dropdown';

const meta = {
    title: 'ui/Dropdown',
    component: Dropdown,
    argTypes: {},
    args: {},
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
