import type { Meta, StoryObj } from '@storybook/react';

import { StarRating } from './StarRating';

const meta = {
    title: 'ui/StarRating',
    component: StarRating,
    argTypes: {},
    args: {},
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSelect: (stars) => alert(`You've selected ${stars} stars`),
    },
};

export const Selected: Story = {
    args: {
        selectedStars: 3,
    },
};
