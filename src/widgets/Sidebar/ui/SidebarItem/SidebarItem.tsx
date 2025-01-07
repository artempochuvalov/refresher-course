import { getUserAuthData } from 'entities/User';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

import { SidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

type SidebarItemProps = {
    item: SidebarItemType;
    collapsed?: boolean;
};

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;

    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={AppLinkTheme.Secondary}
            to={item.path}
            className={classNames(cls.link, { [cls.collapsed]: !!collapsed })}
        >
            <item.Icon className={cls.linkIcon} />
            <span className={cls.linkText}>
                {t(item.text)}
            </span>
        </AppLink>
    );
});
