import {
    type MutableRefObject,
    useEffect
} from 'react';

type InfiniteScrollProps = {
    wrapperRef: MutableRefObject<HTMLDivElement>;
    triggerRef: MutableRefObject<HTMLDivElement>;
    callback: () => void;
};

export const useInfiniteScroll = ({
    wrapperRef,
    triggerRef,
    callback,
}: InfiniteScrollProps) => {
    useEffect(() => {
        const wrapperNode = wrapperRef.current;
        const triggerNode = triggerRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            },
            {
                root: wrapperNode,
            }
        );

        observer.observe(triggerNode);

        return () => {
            observer.unobserve(triggerNode);
        };
    }, [callback, triggerRef, wrapperRef]);
};
