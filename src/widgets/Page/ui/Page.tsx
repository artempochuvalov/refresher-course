import { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';

import cls from './Page.module.scss';

type PageProps = {
    children: ReactNode;
    className?: string;
    onScrollEnd?: () => void;
};

export const Page = (props: PageProps) => {
    const { children, onScrollEnd, className } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: () => onScrollEnd?.(),
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.PageWrapper, {}, [className])}>
            {children}

            <div ref={triggerRef} />
        </section>
    );
};
