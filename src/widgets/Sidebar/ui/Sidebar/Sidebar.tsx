import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button';
import { SidebarItemList } from 'widgets/Sidebar/model/items';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

type SidebarProps = {
    className?: string;
};

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

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
                {SidebarItemList.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </div>
        </div>
    );
});
