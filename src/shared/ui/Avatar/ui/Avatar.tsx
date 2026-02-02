import { type CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames';

import cls from './Avatar.module.scss';

type AvatarProps = {
    className?: string;
    src: string;
    size?: number;
    alt?: string;
};

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
    } = props;

    const style = useMemo<CSSProperties>(() => ({
        width: size,
        height: size,
    }), [size]);

    return (
        <img
            className={classNames(cls.Avatar, {}, [className])}
            src={src}
            style={style}
            alt={alt}
        />
    );
});
