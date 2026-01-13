const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const slice = process.argv[3];

const allowedLayers = [
    'entities',
    'features',
    'pages',
    'widgets',
];

if (!layer || !layer.includes(layer)) {
    throw Error(`Enter layer from list: ${allowedLayers.join(' or ')}`);
}

if (!slice) {
    throw Error('Enter slice name');
}

createTemplate(layer, slice);
