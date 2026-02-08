import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';

interface UseModalOptions {
    isOpen: boolean;
    animationDuration: number;
    onClose?: () => void;
}

export function useModal({ isOpen, animationDuration, onClose }: UseModalOptions) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const close = useCallback(() => {
        setIsClosing(true);

        timerRef.current = setTimeout(() => {
            onClose?.();
            setIsClosing(false);
        }, animationDuration);
    }, [animationDuration, onClose]);

    const handleEscape = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
        }
    }, [close]);

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

    return {
        isClosing,
        isMounted,
        close,
    };
}
