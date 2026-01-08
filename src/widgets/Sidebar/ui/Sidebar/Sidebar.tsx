import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button';
import { Flex, VStack } from 'shared/ui/Stack';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
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

    const sidebarItems = useSelector(getSidebarItems);

    return (
        <aside
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

            <VStack role="navigation" gap="8" className={cls.items}>
                {sidebarItems.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        key={item.path}
                    />
                ))}
            </VStack>

            <Flex
                gap="8"
                justify="center"
                fullWidth
                direction={collapsed ? 'column' : 'row'}
                className={cls.switchers}
            >
                <ThemeSwitcher />
                <LanguageSwitcher short={collapsed} />
            </Flex>
        </aside>
    );
});
