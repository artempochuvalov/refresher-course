import type { Meta, StoryObj } from '@storybook/react';

import { TextAtom } from '../TextAtom/TextAtom';
import { Card } from './Card';

const meta = {
    title: 'ui/Card',
    component: Card,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <TextAtom text="text" />,
    },
};
