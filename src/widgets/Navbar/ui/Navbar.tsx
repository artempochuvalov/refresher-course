import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './Navbar.module.scss';
import { navbarLinks } from '../constants';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={classNames(cls.links)}>
                {navbarLinks.map((link) => (
                    <AppLink to={link.to} key={link.to} theme={AppLinkTheme.Secondary}>
                        {link.title}
                    </AppLink>
                ))}
            </div>
        </div>
    );
};
