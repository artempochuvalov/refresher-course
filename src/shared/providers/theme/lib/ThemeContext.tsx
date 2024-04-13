import { createContext } from 'react';

export enum Theme {
    'Light' = 'light',
    'Dark' = 'dark'
}

export type ThemeContextProps = {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({});

export const THEME_LOCALSTORAGE_KEY = 'theme';
