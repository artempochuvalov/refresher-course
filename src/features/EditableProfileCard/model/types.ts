import { Profile } from 'entities/Profile';

export enum ValidationProfileError {
    NO_DATA = 'NO_DATA',
    INCORRECT_PERSONAL_DATA = 'INCORRECT_PERSONAL_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_CITY = 'INCORRECT_CITY',
    SERVER_ERROR = 'SERVER_ERROR'
}

export type ProfileSchema = {
    profile?: Profile;
    editableProfile?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validationProfileErrors?: ValidationProfileError[];
};
