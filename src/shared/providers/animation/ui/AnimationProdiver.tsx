import {
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import {
    AnimationContext,
    type GestureType,
    type SpringType
} from '../lib/AnimationContext';

async function getAnimationModules() {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(() => ({
        Spring: SpringRef.current,
        Gesture: GestureRef.current,
        isLoaded,
    }), [SpringRef, GestureRef, isLoaded]);

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
