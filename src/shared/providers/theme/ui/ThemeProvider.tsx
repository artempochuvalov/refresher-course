import {
    type FC, ReactElement,
    useMemo, useState,
} from 'react';

import {
    Theme, THEME_LOCALSTORAGE_KEY, ThemeContext, ThemeContextProps,
} from '../lib/ThemeContext';

const ThemeProvider: FC<{ children: ReactElement }> = ({ children }) => {
    const defaultTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme ?? Theme.Light;

    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const themeProviderProps = useMemo<ThemeContextProps>(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={themeProviderProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
