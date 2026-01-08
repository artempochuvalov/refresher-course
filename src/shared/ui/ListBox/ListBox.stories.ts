import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { ListBox } from './ListBox';

const meta = {
    title: 'ui/ListBox',
    component: ListBox,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 'second',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            console.info(value);
        },
    },
};

export const Dark: Story = {
    args: {
        value: 'second',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            console.info(value);
        },
    },
    decorators: [
        ThemeDecorator(Theme.Dark),
    ],
};

export const WithLabel: Story = {
    args: {
        label: 'Label',
        value: 'second',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            console.info(value);
        },
    },
};

export const WithDisabledOption: Story = {
    args: {
        value: 'second',
        options: [
            { value: 'first', content: 'First', disabled: true },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            console.info(value);
        },
    },
};

export const Disabled: Story = {
    args: {
        value: 'second',
        disabled: true,
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            console.info(value);
        },
    },
};
