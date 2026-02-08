import type {
    FC,
    ReactNode
} from 'react';

import { classNames, ClassNamesMods } from '@/shared/lib/classNames';
import { useModal } from '@/shared/lib/hooks/useModal';
import { useTheme } from '@/shared/providers/theme';

import { Portal } from '../../ui/Portal';
import { Overlay } from '../Overlay/Overlay';
import cls from './Modal.module.scss';

interface ModalProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    lazy?: boolean;
    portalElement?: HTMLElement;
    onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        children,
        className,
        isOpen,
        lazy,
        portalElement,
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
        <Portal element={portalElement}>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
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
