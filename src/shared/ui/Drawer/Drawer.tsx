import { type ReactNode, useCallback, useEffect } from 'react';

import { classNames, ClassNamesMods } from '../../lib/classNames';
import { useTheme } from '../../providers/theme';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    onClose: () => void;
}

export const Drawer = (props: DrawerProps) => {
    const {
        isOpen,
        children,
        className,
        onClose,
    } = props;

    const mods: ClassNamesMods = {
        [cls.opened]: isOpen,
    };

    const { theme } = useTheme();

    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className, theme])}>
                <Overlay onClick={onClose} />
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
