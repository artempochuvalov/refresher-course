import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/providers/theme';

import { TextAtom, TextAtomTheme } from './TextAtom';

const meta = {
    title: 'ui/TextAtom',
    component: TextAtom,
    argTypes: {},
    args: {},
} satisfies Meta<typeof TextAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlyTitle: Story = {
    args: {
        title: 'Это крутой заголовок',
    },
};

export const OnlyTitleDark: Story = {
    args: {
        title: 'Это крутой заголовок',
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};

export const OnlyText: Story = {
    args: {
        text: 'Это крутой текст',
    },
};

export const OnlyTextDark: Story = {
    args: {
        text: 'Это крутой текст',
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};

export const TitleWithText: Story = {
    args: {
        title: 'Это крутой текст с крутым текстом',
        text: 'А это крутой текст с крутым заголовком',
    },
};

export const TitleWithTextDark: Story = {
    args: {
        title: 'Это крутой текст с крутым текстом',
        text: 'А это крутой текст с крутым заголовком',
    },
    decorators: [ThemeDecorator(Theme.Dark)],
};

export const Error: Story = {
    args: {
        title: 'Это крутой текст с крутым текстом',
        text: 'А это крутой текст с крутым заголовком',
        theme: TextAtomTheme.Error,
    },
};
