import {
    type FC,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { classNames, ClassNamesMods } from 'shared/lib/classNames';
import { useTheme } from 'shared/providers/theme';

import { Portal } from '../../ui/Portal';
import { Overlay } from '../Overlay/Overlay';
import cls from './Modal.module.scss';

type ModalProps = {
    children?: ReactNode;
    className?: string;
    isOpen?: boolean;
    lazy?: boolean;
    portalElement?: HTMLElement;
    onClose?: () => void;
};

const ANIMATION_DURATION = 300;

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

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods: ClassNamesMods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        setIsClosing(true);

        timerRef.current = setTimeout(() => {
            onClose?.();
            setIsClosing(false);
        }, ANIMATION_DURATION);
    }, [setIsClosing, onClose]);

    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }

        return () => {
            setIsMounted(false);
        };
    }, [isOpen]);

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={portalElement}>
            <div className={classNames(cls.Modal, mods, [className, theme])}>
                <Overlay onClick={closeHandler} />
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
