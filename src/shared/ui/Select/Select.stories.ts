import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta = {
    title: 'ui/Select',
    component: Select,
    argTypes: {},
    args: {
        label: 'Поле ввода',
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: [
            { value: '1', text: 'Первый пункт' },
            { value: '2', text: 'Второй пункт' },
        ],
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};
