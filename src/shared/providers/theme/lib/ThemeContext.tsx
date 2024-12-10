import { createContext } from 'react';

export enum Theme {
    Light = 'app_light_theme',
    Dark = 'app_dark_theme',
}

export type ThemeContextProps = {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({});

export const THEME_LOCALSTORAGE_KEY = 'theme';
