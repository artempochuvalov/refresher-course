import {
    Listbox as HListBox,
    ListboxButton as HListBoxButton,
    ListboxOption as HListBoxOption,
    ListboxOptions as HListBoxOptions
} from '@headlessui/react';
import { ReactNode, useCallback } from 'react';
import { Select } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';

import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import { PopupAnchorPosition } from '../../model/types';
import { PopupAnchorPositionClasses } from '../../styles/constants';
import PopupCls from '../../styles/Popup.module.scss';
import cls from './ListBox.module.scss';

export type ListBoxOption<T extends string> = {
    value: T;
    content: ReactNode;
    disabled?: boolean;
};

type ListBoxProps<T extends string> = {
    value?: string;
    defaultValue?: string;
    label?: string;
    options?: ListBoxOption<T>[];
    anchorPosition?: PopupAnchorPosition;
    disabled?: boolean;
    className?: string;
    onChange: (value: T) => void;
};

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
    const {
        value,
        defaultValue,
        disabled,
        options,
        label,
        anchorPosition = 'bottom left',
        className,
        onChange,
    } = props;

    const handleOnChange = useCallback((value: string) => {
        onChange?.(value as T);
    }, [onChange]);

    const optionsClasses = [PopupAnchorPositionClasses[anchorPosition]];

    return (
        <HStack
            gap="8"
            align="center"
            className={classNames(cls.ListBox, {}, [className, PopupCls.Popup])}
        >
            {label && (
                <span>
                    {`${label}>`}
                </span>
            )}

            <HListBox
                value={value}
                as="div"
                className={cls.listBox}
                onChange={handleOnChange}
                disabled={disabled}
            >
                <HListBoxButton
                    as={Button}
                    disabled={disabled}
                    className={classNames('', { [PopupCls.disabled]: disabled })}
                >
                    {value || defaultValue}
                </HListBoxButton>

                {options?.length && (
                    <HListBoxOptions
                        as="ul"
                        className={classNames(cls.options, {}, optionsClasses)}
                    >
                        {options.map((option) => (
                            <HListBoxOption
                                as="li"
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className={
                                    classNames(cls.option, { [PopupCls.disabled]: option.disabled })
                                }
                            >
                                {({ focus, selected }) => (
                                    <HStack
                                        gap="8"
                                        className={
                                            classNames(
                                                cls.optionContent,
                                                {
                                                    [PopupCls.focus]: focus,
                                                    [PopupCls.selected]: selected,
                                                }
                                            )
                                        }
                                    >
                                        {selected && (
                                            <Select className={classNames(cls.icon, {})} />
                                        )}
                                        {option.content}
                                    </HStack>
                                )}
                            </HListBoxOption>
                        ))}
                    </HListBoxOptions>
                )}
            </HListBox>
        </HStack>
    );
};
