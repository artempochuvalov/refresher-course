import { useCallback, useRef } from 'react';

// eslint-disable-next-line space-before-function-paren, function-paren-newline
export function useDebounce<T extends (...args: any[]) => any>(
    this: unknown,
    callback: T,
    ms: number
): (...args: Parameters<T>) => void {
    const timeout = useRef<number>();

    return useCallback((...args: Parameters<T>) => {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            callback.call(this, ...args);
        }, ms);
    }, [callback, ms]);
}
