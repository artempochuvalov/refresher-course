import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
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
        StoreDecorator({}),
    ],
};

export const Dark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.Light),
        StoreDecorator({}),
    ],
};
