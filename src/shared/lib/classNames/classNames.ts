export type ClassNamesMods = {
    [Property: string]: boolean | string | undefined;
};

export function classNames(
    classNames: string,
    mods: ClassNamesMods = {},
    additional: (string | undefined)[] = []
) {
    const conditionalClassNames = Object.entries(mods)
        .reduce((classNames: (string | undefined)[], [className, flag]) => {
            if (flag) {
                return [...classNames, className];
            }

            return classNames;
        }, []);

    return [
        classNames,
        ...additional,
        ...conditionalClassNames,
    ].filter(Boolean).join(' ');
}
