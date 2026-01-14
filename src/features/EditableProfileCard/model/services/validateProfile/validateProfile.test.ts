import { ValidationProfileError } from '../../types';
import { validateProfile } from './validateProfile';

describe('validateProfile.test', () => {
    test('valid profile passed', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: 40,
            city: 'Москва',
        })).toEqual([]);
    });

    test('no data passed', () => {
        expect(validateProfile()).toEqual([
            ValidationProfileError.NO_DATA,
        ]);
    });

    test('no name passed', () => {
        expect(validateProfile({
            first: '',
            lastname: 'Иванов',
            age: 40,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_PERSONAL_DATA]
        );
    });

    test('no lastname passed', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: '',
            age: 40,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_PERSONAL_DATA]
        );
    });

    test('no age passed', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: undefined,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_AGE]
        );
    });

    test('age is more than 120', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: 121,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_AGE]
        );
    });

    test('age is less than 0', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: -1,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_AGE]
        );
    });

    test('age is equal 0', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: 0,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_AGE]
        );
    });

    test('no city passed', () => {
        expect(validateProfile({
            first: 'Иван',
            lastname: 'Иванов',
            age: -1,
            city: 'Москва',
        })).toEqual(
            [ValidationProfileError.INCORRECT_AGE]
        );
    });

    test('all field are invalid', () => {
        expect(validateProfile({})).toEqual([
            ValidationProfileError.INCORRECT_PERSONAL_DATA,
            ValidationProfileError.INCORRECT_AGE,
            ValidationProfileError.INCORRECT_CITY,
        ]);
    });
});
