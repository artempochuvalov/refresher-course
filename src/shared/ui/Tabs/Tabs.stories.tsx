import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

const meta = {
    title: 'ui/Tabs',
    component: Tabs,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 'value',
        tabs: [
            {
                value: 'value',
                content: 'Выбранный таб',
            },
            {
                value: 'random',
                content: 'Обычный таб',
            },
        ],
    },
};
