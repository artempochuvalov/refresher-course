import { useContext } from 'react';

import { Theme, THEME_LOCALSTORAGE_KEY, ThemeContext } from './ThemeContext';

type UseThemeResult = {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    function toggleTheme() {
        const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;

        setTheme(newTheme);
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, newTheme);

        document.body.classList.add(newTheme);
        document.body.classList.remove(theme);
    }

    return {
        theme,
        toggleTheme,
    };
}
