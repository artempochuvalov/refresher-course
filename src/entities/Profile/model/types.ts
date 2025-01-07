import type { Country } from 'entities/Country';
import type { Currency } from 'entities/Currency';

export type Profile = {
    first?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string;
};

export type ProfileSchema = {
    profile?: Profile;
    editableProfile?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
};
