import { memo } from 'react';
import { ThemeDark, ThemeLight } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { Theme, useTheme } from 'shared/providers/theme';
import { Button, ButtonTheme } from 'shared/ui/Button';

import cls from './ThemeSwitcher.module.scss';

type ThemeSwitcherProps = {
    className?: string;
};

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;

    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.Blank}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.Dark ? <ThemeDark /> : <ThemeLight /> }
        </Button>
    );
});
