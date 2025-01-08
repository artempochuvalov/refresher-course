import type { Country } from 'entities/Country';
import type { Currency } from 'entities/Currency';

export enum ValidateProfileError {
    NO_DATA = 'NO_DATA',
    INCORRECT_PERSONAL_DATA = 'INCORRECT_PERSONAL_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_CITY = 'INCORRECT_CITY',
    SERVER_ERROR = 'SERVER_ERROR'
}

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
    validateProfileErrors?: ValidateProfileError[];
};
