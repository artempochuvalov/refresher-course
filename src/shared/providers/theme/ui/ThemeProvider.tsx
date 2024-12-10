import {
    type FC,
    ReactNode,
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    Theme,
    THEME_LOCALSTORAGE_KEY,
    ThemeContext,
    ThemeContextProps
} from '../lib/ThemeContext';

type ThemeProviderProps = {
    children?: ReactNode;
    initialTheme?: Theme;
};

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        children,
        initialTheme,
    } = props;

    const defaultTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme
        ?? Theme.Light;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const themeProviderProps = useMemo<ThemeContextProps>(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeProviderProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
