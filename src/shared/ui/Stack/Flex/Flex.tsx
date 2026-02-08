import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'column' | 'row';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};
const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};
const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
};

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    fullWidth?: boolean;
    justify?: FlexJustify,
    align?: FlexAlign,
    direction?: FlexDirection,
    gap?: FlexGap,
}

export const Flex = (props: FlexProps) => {
    const {
        children,
        className,
        fullWidth,
        justify = 'start',
        align = 'start',
        direction = 'row',
        gap,
        ...restProps
    } = props;

    const mods = {
        [cls.fullWidth]: fullWidth,
    };
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    return (
        <div
            className={classNames(cls.Flex, mods, classes)}
            {...restProps}
        >
            {children}
        </div>
    );
};
