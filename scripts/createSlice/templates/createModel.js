const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const schemaTypeTemplate = require('./schemaTypeTemplate');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const selectorsTemplate = require('./selectorsTemplate');

module.exports = async (layer, sliceName) => {
    const resolveModelPath = (...segments) => (
        resolveRoot(layer, sliceName, 'model', ...segments)
    );

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('types'));
        } catch {
            console.error('Unavaible to create model directory structure');
        }
    };

    const createSchemaTypeFile = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName)
            );
        } catch {
            console.error('Unavaible to create schema type file');
        }
    };

    const createSliceFile = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName)
            );
        } catch {
            console.error('Unavaible to create slice file');
        }
    };

    const createSelectorsFile = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('selectors', `${sliceName}Selectors.ts`),
                selectorsTemplate(sliceName)
            );
        } catch {
            console.error('Unavaible to create selectors file');
        }
    };

    await createModelStructure();
    await createSchemaTypeFile();
    await createSliceFile();
    await createSelectorsFile();
};
