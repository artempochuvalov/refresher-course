import { type ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames';

import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';

export type TabItem<T extends string = string> = {
    value: T;
    content: ReactNode;
}

enum TabItemTheme {
    Default = 'Default',
    Outlined = 'Outlined'
}

type TabsProps<T extends string = string> = {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
};

export const Tabs = <T extends string = string>(props: TabsProps<T>) => {
    const { tabs, value, className } = props;

    const getTabTheme = useCallback((tab: TabItem<T>) => (
        tab.value === value ? TabItemTheme.Outlined : TabItemTheme.Default
    ), [value]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={classNames(cls.Tab, {}, [cls[getTabTheme(tab)]])}
                    key={tab.value}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
