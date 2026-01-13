const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (layer, sliceName) => `import type { Meta, StoryObj } from '@storybook/react';

import { ${firstLetterCapitalized(sliceName)} } from './${firstLetterCapitalized(sliceName)}';

const meta: Meta<typeof ${firstLetterCapitalized(sliceName)}> = {
    title: '${layer}/${sliceName}',
    component: ${firstLetterCapitalized(sliceName)},
    argTypes: {},
    args: {

    },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {

    },
    decorators: [

    ],
};
`;
