import type { Country, Currency } from 'shared/constants/common';

export type Profile = {
    first: string;
    lastname: string;
    age: 22;
    currency: Currency;
    country: Country,
    city: string,
    username: string,
    avatar: string;
};

export type ProfileSchema = {
    profile?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
};
