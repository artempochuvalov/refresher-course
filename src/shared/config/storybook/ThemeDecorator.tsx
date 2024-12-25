import { Decorator } from '@storybook/react';
import { THEME_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';
import { Theme, ThemeProvider } from 'shared/providers/theme';

export const ThemeDecorator = (theme: Theme): Decorator => (Story) => {
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, theme);

    return (
        <ThemeProvider initialTheme={theme}>
            <div className="app">
                <Story />
            </div>
        </ThemeProvider>
    );
};
