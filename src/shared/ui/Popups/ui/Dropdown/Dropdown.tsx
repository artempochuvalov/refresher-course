/* eslint-disable react/no-array-index-key */
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

import { AppLink } from '../../../AppLink';
import { PopupAnchorPosition } from '../../model/types';
import { PopupAnchorPositionClasses } from '../../styles/constants';
import PopupCls from '../../styles/Popup.module.scss';
import cls from './Dropdown.module.scss';

interface DropdownItem {
    content: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    trigger: ReactNode;
    items: DropdownItem[];
    disabled?: boolean;
    anchorPosition?: PopupAnchorPosition;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        trigger,
        items,
        disabled,
        anchorPosition = 'bottom left',
    } = props;

    const menuClasses = [PopupAnchorPositionClasses[anchorPosition]];

    return (
        <Menu
            as="div"
            className={classNames(
                cls.Dropdown,
                { [cls.disabled]: disabled },
                [className, PopupCls.Popup]
            )}
        >
            <MenuButton as="button" className={PopupCls.trigger}>
                {trigger}
            </MenuButton>

            <MenuItems className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = (({ focus }: { focus: boolean }) => (
                        <button
                            className={classNames(
                                cls.item,
                                {
                                    [PopupCls.focus]: focus,
                                    [PopupCls.disabled]: item.disabled,
                                }
                            )}
                            disabled={item.disabled}
                            onClick={item.onClick}
                            type="button"
                        >
                            {item.content}
                        </button>
                    ));

                    if (item.href) {
                        return (
                            <MenuItem
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={String(index)}
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem
                            as={Fragment}
                            disabled={item.disabled}
                            key={String(index)}
                        >
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
};
