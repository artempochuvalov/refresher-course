import { LanguageSwitcher } from 'features/LanguageSwitcher';
import { ThemeSwitcher } from 'features/ThemeSwitcher';
import { type FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Button } from 'shared/ui/Button';

import cls from './Sidebar.module.scss';

type SidebarProps = {
    className?: string;
};

export const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

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
                onClick={toggleCollapsed}
                data-testid="sidebar-btn"
            >
                {t('Развернуть')}
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </div>
    );
};
