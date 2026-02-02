import {
    type FC,
    ReactNode,
    useEffect,
    useMemo,
    useState
} from 'react';

import { THEME_LOCALSTORAGE_KEY } from '@/shared/constants/localstorage';

import {
    Theme,
    ThemeContext,
    ThemeContextProps
} from '../lib/ThemeContext';

type ThemeProviderProps = {
    children?: ReactNode;
    initialTheme?: Theme;
};

const defaultTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme
    ?? Theme.Light;

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        children,
        initialTheme,
    } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    const themeProviderProps = useMemo<ThemeContextProps>(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        const theme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme || Theme.Light;
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);
        document.body.className = theme;
    });

    return (
        <ThemeContext.Provider value={themeProviderProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
