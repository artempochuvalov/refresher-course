import type { ResolveOptions } from 'webpack';

export function buildExtensions(): ResolveOptions['extensions'] {
    return ['.tsx', '.ts', '.js'];
}
