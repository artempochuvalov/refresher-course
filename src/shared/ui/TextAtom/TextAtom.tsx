import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './TextAtom.module.scss';

export enum TextAtomTheme {
    Default = 'Default',
    Error = 'Error',
    Inverted = 'Inverted',
}

export enum TextAtomSize {
    M = 'm',
    L = 'l',
}

export enum TextAtomAlign {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right'
}

type TextAtomProps = {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextAtomTheme;
    size?: TextAtomSize;
    align?: TextAtomAlign;
};

export const TextAtom = memo((props: TextAtomProps) => {
    const {
        className,
        title,
        text,
        theme = TextAtomTheme.Default,
        size = TextAtomSize.M,
        align = TextAtomAlign.Left,
    } = props;

    const additionalClasses = [
        className,
        cls[theme],
        cls[align],
        cls[size],
    ];

    return (
        <div className={classNames(cls.TextAtom, {}, additionalClasses)}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
