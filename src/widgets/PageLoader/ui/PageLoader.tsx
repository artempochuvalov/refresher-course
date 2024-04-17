import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames';
import { Loader } from 'shared/ui/Loader';

import cls from './PageLoader.module.scss';

type PageLoaderProps = {
    className?: string;
};

export const PageLoader: FC<PageLoaderProps> = (props: PageLoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};
