const path = require('path');

module.exports = {
    meta: {
        name: 'import-checker',
        version: '1.0.0',
        type: 'problem',
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const sourcePath = context.getFilename();

                if (shouldBeRelative(importPath, sourcePath)) {
                    context.report(node, 'Relative import expected for same slice imports.');
                }
            },
        };
    },
};

const layers = new Set(['app', 'widgets', 'features', 'entities', 'shared']);

function isRelative(path) {
    return path.startsWith('.') || path.startsWith('./') || path.startsWith('../');
}

function shouldBeRelative(importPath, sourcePath) {
    if (!(importPath && sourcePath)) {
        return false;
    }

    const importNamespacePath = path.toNamespacedPath(importPath);
    if (isRelative(importNamespacePath)) {
        return false;
    }

    const sourceProject = path.toNamespacedPath(sourcePath).split('src')[1];
    if (!sourceProject) {
        return false;
    }
    const [sourceLayer, sourceSlice] = sourceProject.split('/').slice(1);
    const [importLayer, importSlice] = importNamespacePath.split('/');

    if (!(sourceLayer && layers.has(sourceLayer) && sourceSlice)) {
        return false;
    }

    return importLayer === sourceLayer && importSlice === sourceSlice;
}
