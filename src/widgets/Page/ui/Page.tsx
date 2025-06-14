import { StateSchema } from 'app/providers/StoreProvider';
import {
    type MutableRefObject,
    type ReactNode,
    type UIEvent,
    useRef
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle';

import { getScrollPositionByRoute } from '../model/selectors/scrollPositionSelectors';
import { scrollPositionActions } from '../model/slices/scrollPositionSlice';
import cls from './Page.module.scss';

type PageProps = {
    children: ReactNode;
    className?: string;
    onScrollEnd?: () => void;
};

export const Page = (props: PageProps) => {
    const { children, onScrollEnd, className } = props;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const currentScrollPosition = useSelector(
        (state: StateSchema) => getScrollPositionByRoute(state, pathname)
    );

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: () => onScrollEnd?.(),
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = currentScrollPosition;
    });

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
        const position = event.currentTarget.scrollTop;

        dispatch(scrollPositionActions.setScrollPosition({
            route: pathname,
            position,
        }));
    }, 500);

    return (
        <section
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(cls.PageWrapper, {}, [className])}
        >
            {children}

            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
};
