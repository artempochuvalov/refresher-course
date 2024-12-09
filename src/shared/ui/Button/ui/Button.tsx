import type { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Button.module.scss';

export enum ButtonTheme {
    Blank = 'blank',
    BlankInverted = 'blankInverted',
    Outline = 'outline',
    Background = 'background',
    BackgroundInverted = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    size?: ButtonSize;
    theme?: ButtonTheme;
    squared?: boolean;
};

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const {
        className,
        size = ButtonSize.M,
        theme,
        squared,
        children,
        ...restProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.squared]: squared,
    };
    const additionalClasses = [
        className,
        cls[theme],
        cls[size],
    ];

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, additionalClasses)}
            {...restProps}
        >
            {children}
        </button>
    );
};
