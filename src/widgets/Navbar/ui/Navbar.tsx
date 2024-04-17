import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

import { navbarLinks } from '../constants';
import cls from './Navbar.module.scss';

type NavbarProps = {
    className?: string;
};

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={classNames(cls.links)}>
                {navbarLinks.map((link) => (
                    <AppLink
                        to={link.to}
                        key={link.to}
                        theme={AppLinkTheme.Secondary}
                    >
                        {link.title(t)}
                    </AppLink>
                ))}
            </div>
        </div>
    );
};
