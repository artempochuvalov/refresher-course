export type BuildMode = 'production' | 'development';

export type BuildEnv = {
    mode: BuildMode;
    port: number;
    apiUrl: string;
};

export type BuildPaths = {
    entry: string;
    build: string;
    HTML: string;
    src: string;
};

export type BuildOptions = {
    mode: BuildMode;
    isDev: boolean;
    paths: BuildPaths;
    port: number;
    apiUrl: string;
    project: 'frontend' | 'storybook' | 'jest';
};
