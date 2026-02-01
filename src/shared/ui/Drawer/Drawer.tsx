import {
    memo,
    type ReactNode,
    useCallback,
    useEffect
} from 'react';
import { useAnimationLibs } from 'shared/providers/animation/lib/useAnimation';

import { classNames } from '../../lib/classNames';
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

const height = window.innerHeight - 100;

export const DrawerContent = (props: DrawerProps) => {
    const {
        isOpen,
        children,
        className,
        onClose,
    } = props;

    const { theme } = useTheme();

    const {
        Spring: {
            config,
            useSpring,
            a,
        },
        Gesture: { useDrag },
    } = useAnimationLibs();
    const [{ y }, api] = useSpring(() => ({ y: height }));

    const openDrawer = useCallback(({ canceled }: { canceled: boolean }) => {
        api.start({
            y: 0,
            immediate: false,
            config: canceled ? config.wobbly : config.stiff,
        });
    }, [api, config.stiff, config.wobbly]);

    const closeDrawer = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            offset: [, oy],
            canceled,
            cancel,
        }) => {
            if (oy < -70) {
                cancel();
            }

            if (!last) {
                api.start({ y: oy, immediate: true });
                return;
            }

            if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
                closeDrawer(vy);
            } else {
                openDrawer({ canceled });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        }
    );

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    useEffect(() => {
        if (isOpen) {
            openDrawer({ canceled: false });
        }
    }, [openDrawer, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {}, [className, theme])}>
                <Overlay onClick={closeDrawer} />
                <a.div
                    className={cls.sheet}
                    role="dialog"
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </a.div>
            </div>
        </Portal>
    );
};

export const Drawer = memo((props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});
