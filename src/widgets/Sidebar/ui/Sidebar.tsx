import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { type FC, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button';

import cls from './Sidebar.module.scss';

type SidebarProps = {
    className?: string;
};

export const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);

    return (
        <div
            className={classNames(
                cls.Sidebar,
                { [cls.collapsed]: collapsed },
                [className]
            )}
        >
            <Button onClick={toggleCollapsed}>toggle</Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </div>
    );
};
