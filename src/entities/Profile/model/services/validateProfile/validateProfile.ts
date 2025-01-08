import { Profile, ValidateProfileError } from '../../types';

export const validateProfile = (profile?: Profile) => {
    const errors: ValidateProfileError[] = [];

    if (!profile) {
        errors.push(ValidateProfileError.NO_DATA);
        return errors;
    }

    const {
        first,
        lastname,
        age,
        city,
    } = profile;

    if (!first || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_PERSONAL_DATA);
    }

    if (!age || age > 120 || age <= 0) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    if (!city) {
        errors.push(ValidateProfileError.INCORRECT_CITY);
    }

    return errors;
};
