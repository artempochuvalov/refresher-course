import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
    onClick: () => void;
    className?: string;
}

export const Overlay = memo((props: OverlayProps) => {
    const { onClick, className } = props;

    return (
        <div className={classNames(cls.Overlay, {}, [className])} onClick={onClick} />
    );
});
