import {
    Listbox as HListBox,
    ListboxButton as HListBoxButton,
    ListboxOption as HListBoxOption,
    ListboxOptions as HListBoxOptions
} from '@headlessui/react';
import { ReactNode, useCallback } from 'react';
import { Select } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames';
import { DropdownAnchorPosition } from 'shared/types/dropdown';

import { Button } from '../Button';
import { HStack } from '../Stack';
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
    anchorPosition?: DropdownAnchorPosition;
    disabled?: boolean;
    className?: string;
    onChange: (value: T) => void;
};

const ListBoxAnchorPositionClasses: Record<DropdownAnchorPosition, string> = {
    'top left': cls.topLeft,
    'top right': cls.topRight,
    'bottom left': cls.bottomLeft,
    'bottom right': cls.bottomRight,
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

    const optionsClasses = [ListBoxAnchorPositionClasses[anchorPosition]];

    return (
        <HStack
            gap="8"
            align="center"
            className={classNames(cls.ListBox, {}, [className])}
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
                    className={classNames('', { [cls.disabled]: disabled })}
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
                                    classNames(cls.option, { [cls.disabled]: option.disabled })
                                }
                            >
                                {({ focus, selected }) => (
                                    <HStack
                                        gap="8"
                                        className={
                                            classNames(
                                                cls.optionContent,
                                                {
                                                    [cls.focus]: focus,
                                                    [cls.selected]: selected,
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
