const firstLetterCapitalized = require('../firstLetterCapitalized');

/* eslint-disable max-len */
module.exports = (sliceName) => `export { ${sliceName}Reducer, ${sliceName}Slice } from './model/slices/${sliceName}Slice';
export type { ${firstLetterCapitalized(sliceName)}Schema } from './model/types/${sliceName}Schema';
export { ${firstLetterCapitalized(sliceName)} } from './ui/${firstLetterCapitalized(sliceName)}';
`;
