import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Loader.module.scss';

type LoaderProps = {
    className?: string;
};

export const Loader = memo((props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loader, {}, [className])} />
    );
});
