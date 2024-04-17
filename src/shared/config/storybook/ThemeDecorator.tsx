import { Decorator } from '@storybook/react';
import { Theme } from 'shared/providers/theme';

export const ThemeDecorator = (theme: Theme): Decorator => (Story) => (
    <div className={`app ${theme}`}>
        <Story />
    </div>
);
