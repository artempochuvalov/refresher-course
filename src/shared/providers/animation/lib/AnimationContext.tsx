import { createContext } from 'react';

export type SpringType = typeof import('@react-spring/web');
export type GestureType = typeof import('@use-gesture/react');

export type AnimationContextProps = {
    Spring?: SpringType;
    Gesture?: GestureType;
    isLoaded?: boolean;
};

export const AnimationContext = createContext<AnimationContextProps>({});
