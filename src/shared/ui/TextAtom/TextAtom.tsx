import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './TextAtom.module.scss';

export enum TextAtomTheme {
    Default = 'Default',
    Error = 'Error',
}

type TextAtomProps = {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextAtomTheme;
};

export const TextAtom: FC<TextAtomProps> = (props) => {
    const {
        className,
        title,
        text,
        theme = TextAtomTheme.Default,
    } = props;

    const additionalClasses = [
        className,
        cls[theme],
    ];

    return (
        <div className={classNames(cls.TextAtom, {}, additionalClasses)}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
};
