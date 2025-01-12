import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
    title: 'ui/Input',
    component: Input,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Плейсхолдер',
        value: 'А тут что-то ввели',
    },
};

export const Readonly: Story = {
    args: {
        placeholder: 'Инпут только для чтения',
        readonly: true,
    },
};

export const Numeric: Story = {
    args: {
        placeholder: 'Инпут только для чисел',
        numeric: true,
    },
};
