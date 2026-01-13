const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (sliceName) => `export interface ${firstLetterCapitalized(sliceName)}Schema {
    
}
`;
