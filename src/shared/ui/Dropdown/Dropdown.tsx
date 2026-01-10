import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames';

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
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        trigger,
        items,
    } = props;

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <MenuButton as="button" className={cls.button}>
                {trigger}
            </MenuButton>

            <MenuItems className={cls.menu}>
                {items.map((item) => (
                    <MenuItem as={Fragment} disabled={item.disabled}>
                        {({ focus }) => (
                            <button
                                className={classNames(
                                    cls.item,
                                    {
                                        [cls.active]: focus,
                                        [cls.disabled]: item.disabled,
                                    }
                                )}
                                onClick={item.onClick}
                                type="button"
                            >
                                {item.content}
                            </button>
                        )}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
};
