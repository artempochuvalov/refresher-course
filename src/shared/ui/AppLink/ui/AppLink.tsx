import type { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    'Primary' = 'primary',
    'Secondary' = 'secondary'
}

type AppLinkProps = {
    className?: string;
    theme?: AppLinkTheme;
} & LinkProps;

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className,
        to,
        children,
        theme = AppLinkTheme.Primary,
        ...restProps
    } = props;

    return (
        <Link
            className={classNames(cls.link, {}, [className, cls[theme]])}
            to={to}
            {...restProps}
        >
            {children}
        </Link>
    );
};
