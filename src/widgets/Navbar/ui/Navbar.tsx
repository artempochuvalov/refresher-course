import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={classNames(cls.links)}>
                /
            </div>
        </div>
    );
};
