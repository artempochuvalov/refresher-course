import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import Forbidden from './Forbidden';

const meta: Meta<typeof Forbidden> = {
    title: 'pages/Forbidden',
    component: Forbidden,
    argTypes: {},
    args: {

    },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.Light),
    ],
};

export const Dark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.Light),
    ],
};
