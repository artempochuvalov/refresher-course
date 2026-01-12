const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const componentTemplate = require('./componentTemplate');
const stylesTemplate = require('./stylesTemplate');
const storybookTemplate = require('./storybookTemplate');
const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = async (layer, sliceName) => {
    const componentName = firstLetterCapitalized(sliceName);

    const resolveUIPath = (...segments) => (
        resolveRoot(layer, sliceName, 'ui', ...segments)
    );

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch {
            console.error('Unavaible to create ui directory');
        }
    };

    const createComponent = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(`${componentName}.tsx`),
                componentTemplate(sliceName)
            );
        } catch {
            console.error('Unavaible to create component');
        }
    };

    const createStyles = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(`${componentName}.module.scss`),
                stylesTemplate(sliceName)
            );
        } catch {
            console.error('Unavaible to create module styles');
        }
    };

    const createStorybook = async () => {
        try {
            await fs.writeFile(
                resolveUIPath(`${componentName}.stories.tsx`),
                storybookTemplate(layer, sliceName)
            );
        } catch {
            console.error('Unavaible to create storybook file');
        }
    };

    await createUIDir();
    await createComponent();
    await createStyles();
    await createStorybook();
};
