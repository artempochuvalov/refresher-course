import type { Meta, StoryObj } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import Profile from './Profile';

const meta = {
    title: 'pages/Profile',
    component: Profile,
    argTypes: {},
    args: {},
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line max-len
const avatar = 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=620&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

export const Light: Story = {
    decorators: [
        ThemeDecorator(Theme.Light),
        StoreDecorator({
            profile: {
                editableProfile: {
                    first: 'Иван',
                    lastname: 'Иванов',
                    age: 40,
                    city: 'Москва',
                    country: Country.Russia,
                    currency: Currency.RUB,
                    avatar,
                },
            },
        }),
    ],
};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.Dark),
        StoreDecorator({
            profile: {
                editableProfile: {
                    first: 'Иван',
                    lastname: 'Иванов',
                    age: 40,
                    city: 'Москва',
                    country: Country.Russia,
                    currency: Currency.RUB,
                    avatar,
                },
            },
        }),
    ],
};
