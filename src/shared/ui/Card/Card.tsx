import { type HTMLAttributes, ReactNode } from 'react';

import { classNames, ClassNamesMods } from '@/shared/lib/classNames';

import cls from './Card.module.scss';

type CardProps = HTMLAttributes<HTMLDivElement> & {
    fullWidth?: boolean;
    children: ReactNode;
    className?: string;
};

export const Card = (props: CardProps) => {
    const {
        fullWidth,
        children,
        className,
        ...restProps
    } = props;

    const classMods: ClassNamesMods = {
        [cls.fullWidth]: fullWidth,
    };

    return (
        <div className={classNames(cls.Card, classMods, [className])} {...restProps}>
            {children}
        </div>
    );
};
