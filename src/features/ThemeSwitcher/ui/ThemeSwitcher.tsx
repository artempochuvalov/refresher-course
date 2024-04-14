import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Theme, useTheme } from 'shared/providers/theme';
import cls from './ThemeSwitcher.module.scss';

import { ThemeDark, ThemeLight } from 'shared/assets/icons';
import { Button, ButtonTheme } from 'shared/ui/Button';

type ThemeSwitcherProps = {
    className?: string;
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const { className } = props;
    
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.Blank}
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.Light ? <ThemeLight /> : <ThemeDark /> }
        </Button>
    );
};
