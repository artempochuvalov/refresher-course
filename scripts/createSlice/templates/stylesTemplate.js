const firstLetterCapitalized = require('../firstLetterCapitalized');

module.exports = (sliceName) => `.${firstLetterCapitalized(sliceName)} {
    display: block;
}
`;
