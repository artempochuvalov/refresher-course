import { useCallback, useRef } from 'react';

// eslint-disable-next-line space-before-function-paren, function-paren-newline
export function useThrottle<T extends (...args: any[]) => any>(
    this: unknown,
    callback: T,
    ms: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    const isThrottling = useRef(false);

    const lastResult = useRef<ReturnType<T>>();

    return useCallback((...args: Parameters<T>) => {
        if (!isThrottling.current) {
            lastResult.current = callback.call(this, ...args);

            isThrottling.current = true;
            setTimeout(() => {
                isThrottling.current = false;
            }, ms);
            return lastResult.current;
        }
        return undefined;
    }, [callback, ms]);
}
