import { Decorator } from '@storybook/react';
import { Theme, ThemeProvider } from 'shared/providers/theme';

export const ThemeDecorator = (theme: Theme): Decorator => (Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <Story />
        </div>
    </ThemeProvider>
);
