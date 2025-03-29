import { type HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Card.module.scss';

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
};

export const Card = (props: CardProps) => {
    const { children, className } = props;

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            {children}
        </div>
    );
};
