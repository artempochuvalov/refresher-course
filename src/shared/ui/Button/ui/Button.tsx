import type { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    'Blank' = 'blank'
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    theme?: ButtonTheme;
};

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        theme,
        children,
        ...restProps
    } = props;

    return (
        <button
            className={classNames(cls.button, {}, [className, cls[theme]])}
            {...restProps}
        >
            {children}
        </button>
    );
};
