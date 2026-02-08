import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/providers/theme';

import { ListBox } from './ListBox';

const meta = {
    title: 'ui/ListBox',
    component: ListBox,
    argTypes: {},
    args: {},
    decorators: [
        (Story) => (
            <div style={{ padding: '100px' }}><Story /></div>
        ),
    ],
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
            alert(value);
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
            alert(value);
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
            alert(value);
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
            alert(value);
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
            alert(value);
        },
    },
};

export const TopLeft: Story = {
    args: {
        value: 'second',
        anchorPosition: 'top left',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            alert(value);
        },
    },
};

export const TopRight: Story = {
    args: {
        value: 'second',
        anchorPosition: 'top right',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            alert(value);
        },
    },
};

export const BottomLeft: Story = {
    args: {
        value: 'second',
        anchorPosition: 'bottom left',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            alert(value);
        },
    },
};

export const BottomRight: Story = {
    args: {
        value: 'second',
        anchorPosition: 'bottom right',
        options: [
            { value: 'first', content: 'First' },
            { value: 'second', content: 'Second' },
            { value: 'third', content: 'Third' },
        ],
        onChange: (value: string) => {
            alert(value);
        },
    },
};
