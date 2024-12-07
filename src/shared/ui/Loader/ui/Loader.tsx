import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Loader.module.scss';

type LoaderProps = {
    className?: string;
};

export const Loader: FC<LoaderProps> = (props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loader, {}, [className])} />
    );
};
