import {
    Popover as HPopover,
    PopoverButton as HPopoverButton,
    PopoverPanel as HPopoverPanel
} from '@headlessui/react';
import type { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import type { PopupAnchorPosition } from '../../model/types';
import { PopupAnchorPositionClasses } from '../../styles/constants';
import PopupCls from '../../styles/Popup.module.scss';
import cls from './Popover.module.scss';

type PopoverProps = {
    trigger: ReactNode;
    disabled?: boolean;
    anchorPosition?: PopupAnchorPosition;
    children?: ReactNode;
    className?: string;
};

export const Popover = (props: PopoverProps) => {
    const {
        trigger,
        disabled,
        anchorPosition = 'bottom left',
        children,
        className,
    } = props;

    const panelClasses = [PopupAnchorPositionClasses[anchorPosition]];

    return (
        <HPopover className={classNames(cls.Popover, {}, [className, PopupCls.Popup])}>
            <HPopoverButton
                as="div"
                className={classNames(
                    PopupCls.trigger,
                    { [PopupCls.disabled]: disabled }
                )}
            >
                {trigger}
            </HPopoverButton>

            <HPopoverPanel className={classNames(cls.panel, {}, panelClasses)}>
                {children}
            </HPopoverPanel>
        </HPopover>
    );
};
