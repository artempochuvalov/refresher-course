import type { ReactNode } from 'react';
import { useModal } from 'shared/lib/hooks/useModal';

import { classNames, ClassNamesMods } from '../../lib/classNames';
import { useTheme } from '../../providers/theme';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    isOpen: boolean;
    children: ReactNode;
    lazy?: boolean;
    className?: string;
    onClose: () => void;
}

export const Drawer = (props: DrawerProps) => {
    const {
        isOpen,
        lazy,
        children,
        className,
        onClose,
    } = props;

    const { theme } = useTheme();

    const {
        isClosing,
        isMounted,
        close,
    } = useModal({
        isOpen,
        animationDuration: 300,
        onClose,
    });

    const mods: ClassNamesMods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme])}>
                <Overlay onClick={close} />
                <div
                    className={cls.content}
                    role="dialog"
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
