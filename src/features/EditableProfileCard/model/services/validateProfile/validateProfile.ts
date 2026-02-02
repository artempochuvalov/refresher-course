import { Profile } from '@/entities/Profile';

import { ValidationProfileError } from '../../constants';

export const validateProfile = (profile?: Profile) => {
    const errors: ValidationProfileError[] = [];

    if (!profile) {
        errors.push(ValidationProfileError.NO_DATA);
        return errors;
    }

    const {
        first,
        lastname,
        age,
        city,
    } = profile;

    if (!first || !lastname) {
        errors.push(ValidationProfileError.INCORRECT_PERSONAL_DATA);
    }

    if (!age || age > 120 || age <= 0) {
        errors.push(ValidationProfileError.INCORRECT_AGE);
    }

    if (!city) {
        errors.push(ValidationProfileError.INCORRECT_CITY);
    }

    return errors;
};
