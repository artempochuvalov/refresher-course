const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const publicAPITemplate = require('./publicAPITemplate');

module.exports = async (layer, sliceName) => {
    try {
        await fs.writeFile(
            resolveRoot(layer, sliceName, 'index.ts'),
            publicAPITemplate(sliceName)
        );
    } catch {
        console.error('Unavaible to create public API file');
    }
};
