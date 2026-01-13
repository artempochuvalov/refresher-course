import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from './Flex';

const meta = {
    title: 'ui/Flex',
    component: Flex,
    argTypes: {},
    args: {
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>thourth</div>
            </>
        ),
    },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {},
};

export const RowGap4: Story = {
    args: {
        gap: '4',
    },
};

export const RowGap8: Story = {
    args: {
        gap: '8',
    },
};

export const RowGap16: Story = {
    args: {
        gap: '16',
    },
};

export const RowGap32: Story = {
    args: {
        gap: '32',
    },
};

export const RowJustifyCenter: Story = {
    args: {
        justify: 'center',
    },
};

export const RowJustifyEnd: Story = {
    args: {
        justify: 'end',
    },
};

export const RowJustifyBetween: Story = {
    args: {
        justify: 'between',
    },
};

export const Column: Story = {
    args: {
        direction: 'column',
    },
};

export const ColumnAlignCenter: Story = {
    args: {
        direction: 'column',
        align: 'center',
    },
};

export const ColumnAlignEnd: Story = {
    args: {
        direction: 'column',
        align: 'end',
    },
};
