import { classNames } from './classNames';

describe('classNames', () => {
    test('classNames with single class', () => {
        const className = 'someClass';

        expect(classNames(className)).toBe(className);
    });

    test('classNames with additional classes', () => {
        const expected = 'someClass class1 class2';

        expect(
            classNames('someClass', {}, ['class1', 'class2'])
        ).toBe(expected);
    });

    test('classNames with mods', () => {
        const expected = 'someClass class hovered clicked';

        expect(
            classNames('someClass', { hovered: true, clicked: true }, ['class'])
        ).toBe(expected);
    });

    test('classNames with false mods', () => {
        const expected = 'someClass class clicked';

        expect(classNames(
            'someClass',
            { hovered: false, clicked: true },
            ['class']
        )).toBe(expected);
    });

    test('classNames with undefined mods', () => {
        const expected = 'someClass class clicked';

        expect(classNames(
            'someClass',
            { hovered: undefined, clicked: true },
            ['class']
        )).toBe(expected);
    });

    test('classNames with undefined additional', () => {
        const expected = 'someClass additional';

        expect(classNames('someClass', {}, [undefined, 'additional'])).toBe(expected);
    });
});
