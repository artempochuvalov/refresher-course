const { mkdir } = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createUI = require('./createUI');
const createModel = require('./createModel');
const createPublicApi = require('./createPublicApi');
const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = async (layer, sliceName) => {
    try {
        await mkdir(resolveRoot(layer, firstLetterCapitalized(sliceName)));

        await createUI(layer, sliceName);
        await createModel(layer, sliceName);
        await createPublicApi(layer, sliceName);
    } catch {
        console.error(`Unavailable to create directory of slice ${sliceName}`);
    }
};
