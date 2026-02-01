import { useContext } from 'react';

import { AnimationContext, type AnimationContextProps } from './AnimationContext';

export const useAnimationLibs = () => (
    useContext(AnimationContext) as Required<AnimationContextProps>
);
