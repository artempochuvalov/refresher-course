import type { Meta, StoryObj } from '@storybook/react';

import Articles from './Articles';

const meta = {
    title: 'pages/Articles',
    component: Articles,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Articles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
