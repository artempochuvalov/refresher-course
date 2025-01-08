declare module '*.scss' {
    interface ClassNames {
        [className: string]: string;
    }

    const classNames: ClassNames;
    export = classNames;
}

declare module '*.svg' {
    import { FC, SVGProps } from 'react';

    const content: FC<SVGProps<SVGElement>>;
    export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest';

declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
