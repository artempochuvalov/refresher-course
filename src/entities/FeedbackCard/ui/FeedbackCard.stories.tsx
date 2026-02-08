import type { Meta, StoryObj } from '@storybook/react';

import { FeedbackCard } from './FeedbackCard';

const meta: Meta<typeof FeedbackCard> = {
    title: 'entities/FeedbackCard',
    component: FeedbackCard,
    argTypes: {},
    args: {},
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Rate this article',
        feedbackTitle: 'Leave the feedback',
        hasFeedback: true,
    },
};
