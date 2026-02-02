import { useContext } from 'react';

import { THEME_LOCALSTORAGE_KEY } from '@/shared/constants/localstorage';

import { Theme, ThemeContext } from './ThemeContext';

type UseThemeResult = {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    function toggleTheme() {
        const newTheme = (() => {
            switch (theme) {
                case Theme.Light:
                    return Theme.Dark;
                case Theme.Dark:
                    return Theme.Orange;
                case Theme.Orange:
                    return Theme.Light;
                default:
                    return Theme.Light;
            }
        })();

        setTheme?.(newTheme);
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, newTheme);

        document.body.classList.add(newTheme);
        document.body.classList.remove(theme || '');
    }

    return {
        theme: theme || Theme.Light,
        toggleTheme,
    };
}
