import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import React from 'react';

import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator';
import { Theme } from '../../src/shared/providers/theme';

initialize();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        RouterDecorator,
        StyleDecorator,
        ThemeDecorator(Theme.Light),
        TranslationDecorator,
        SuspenseDecorator,
    ],
    loaders: [mswLoader],
};

export default preview;
