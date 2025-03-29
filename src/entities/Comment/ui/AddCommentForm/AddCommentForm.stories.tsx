import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import AddCommentForm from './AddCommentForm';

const meta = {
    title: 'entities/AddCommentForm',
    component: AddCommentForm,
    argTypes: {},
    args: {},
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSend: fn(),
    },
};

export const Error: Story = {
    args: {
        onSend: fn(),
        error: 'error',
    },
};
