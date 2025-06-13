import { useCallback, useRef } from 'react';

export function useThrottle<Args extends unknown[]>(
    this: unknown,
    callback: (...args: Args) => void,
    ms: number
) {
    const isThrottling = useRef(false);

    return useCallback((args: Args) => {
        if (!isThrottling.current) {
            callback.call(this, ...args);

            setTimeout(() => {
                isThrottling.current = true;
            }, ms);
        }
    }, [callback, ms]);
}
