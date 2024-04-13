export type BuildMode = 'production' | 'development';

export type BuildEnv = {
    mode: BuildMode;
    port: number;
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
};
