import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    children?: ReactNode;
    element?: HTMLElement;
};

export const Portal: FC<PortalProps> = (props) => {
    const {
        children,
        element = document.body,
    } = props;

    return (
        createPortal(children, element)
    );
};
