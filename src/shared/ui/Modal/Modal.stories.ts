import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/providers/theme';

import { Modal } from './Modal';

const meta = {
    title: 'ui/Modal',
    component: Modal,
    argTypes: {},
    args: {
        children: 'Lorem lorem lorem lorem lorem lorem',
        isOpen: true,
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(Theme.Dark)],
};
