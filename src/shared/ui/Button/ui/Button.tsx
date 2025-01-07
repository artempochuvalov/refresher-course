import { type ButtonHTMLAttributes, memo, type ReactNode } from 'react';
import { classNames, ClassNamesMods } from 'shared/lib/classNames';

import cls from './Button.module.scss';

export enum ButtonTheme {
    Blank = 'blank',
    BlankInverted = 'blankInverted',
    Outline = 'outline',
    OutlineRed = 'outlineRed',
    Background = 'background',
    BackgroundInverted = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    className?: string;
    size?: ButtonSize;
    theme?: ButtonTheme;
    squared?: boolean;
    disabled?: boolean;
};

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        size = ButtonSize.M,
        theme = ButtonTheme.Outline,
        squared,
        children,
        disabled,
        ...restProps
    } = props;

    const mods: ClassNamesMods = {
        [cls.squared]: squared,
        [cls.disabled]: disabled,
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
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
});
