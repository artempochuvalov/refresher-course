type Mods = {
    [Property: string]: boolean | string;
};

export function classNames(classNames: string, mods: Mods = {}, additional: string[] = []) {
    const conditionalClassNames = Object.entries(mods).reduce((classNames, [className, flag]) => {
        if (Boolean(flag)) {
            return [...classNames, className];
        }

        return classNames;
    }, []);

    return [
        classNames,
        ...additional,
        ...conditionalClassNames
    ].join(' ');
}
