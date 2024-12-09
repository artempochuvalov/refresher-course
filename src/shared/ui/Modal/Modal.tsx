import {
    type FC,
    type MouseEvent,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import { classNames } from 'shared/lib/classNames';
import { Portal } from 'shared/ui/Portal';

import cls from './Modal.module.scss';

type ModalProps = {
    children?: ReactNode;
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
};

const ANIMATION_DURATION = 300;

export const Modal: FC<ModalProps> = (props) => {
    const {
        children,
        className,
        isOpen,
        onClose,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const mods: Record<string, boolean> = {
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
    const contentClickHandler = (event: MouseEvent) => {
        event.stopPropagation();
    };

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

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div
                    className={cls.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={cls.content}
                        onClick={contentClickHandler}
                        role="dialog"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
