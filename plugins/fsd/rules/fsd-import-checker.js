module.exports = {
    meta: {
        name: 'import-checker',
        version: '1.0.0',
        type: 'problem',
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                context.report(node, 'FSD layer violation detected.');
            },
        };
    },
};
