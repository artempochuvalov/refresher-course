import type { Meta, StoryObj } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/ui/Avatar/storybook.png';

import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {},
    args: {},
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        profileData: {
            first: 'Иван',
            lastname: 'Иванов',
            age: 40,
            city: 'Москва',
            country: Country.Russia,
            currency: Currency.RUB,
            avatar,
        },
    },
};

export const Error: Story = {
    args: {
        error: 'error',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};
