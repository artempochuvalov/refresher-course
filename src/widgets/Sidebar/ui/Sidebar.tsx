import { RoutePaths } from 'app/providers/routeConfig/routeConfig';
import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { About, Main } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { ButtonSize } from 'shared/ui/Button/ui/Button';

import cls from './Sidebar.module.scss';

type SidebarProps = {
    className?: string;
};

export const Sidebar: FC<SidebarProps> = (props: SidebarProps) => {
    const { className } = props;

    const { t } = useTranslation(['main', 'about']);
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                cls.Sidebar,
                { [cls.collapsed]: collapsed },
                [className]
            )}
        >
            <Button
                className={classNames(cls.collapsedBtn)}
                theme={ButtonTheme.BackgroundInverted}
                size={ButtonSize.L}
                squared
                onClick={toggleCollapsed}
                data-testid="sidebar-btn"
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={cls.items}>
                <AppLink
                    theme={AppLinkTheme.Secondary}
                    to={RoutePaths.Main}
                    className={cls.link}
                >
                    <Main className={cls.linkIcon} />
                    <span className={cls.linkText}>
                        {t('Главная страница', { ns: 'main' })}
                    </span>
                </AppLink>

                <AppLink
                    theme={AppLinkTheme.Secondary}
                    to={RoutePaths.About}
                    className={cls.link}
                >
                    <About className={cls.linkIcon} />
                    <span className={cls.linkText}>
                        {t('О сайте', { ns: 'about' })}
                    </span>
                </AppLink>
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </div>
        </div>
    );
};
