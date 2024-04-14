import { useState, type FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './Sidebar.module.scss';
import { Button } from 'shared/ui/Button';
import { ThemeSwitcher } from 'features/ThemeSwitcher';

type SidebarProps = {
    className?: string;
};

export const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState(true);

    function toggleCollapsed() {
        setCollapsed(collapsed => !collapsed);
    }

    return (
        <div
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button onClick={toggleCollapsed}>toggle</Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
