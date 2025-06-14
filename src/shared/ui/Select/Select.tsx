import {
    type ChangeEvent,
    useCallback,
    useMemo
} from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Select.module.scss';

export type SelectOption<T extends string> = {
    value: T;
    text: string;
};

type SelectProps<T extends string> = {
    className?: string;
    label?: string;
    value?: string;
    options?: SelectOption<T>[];
    readonly?: boolean;
    onChange?: (value: string) => void;
};

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange,
    } = props;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);

    const optionsList = useMemo(() => (
        options?.map(({ value, text }) => (
            <option
                className={cls.option}
                value={value}
                key={value}
            >
                {text}
            </option>
        ))
    ), [options]);

    return (
        <div className={classNames(cls.SelectWrapper, {}, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={handleOnChange}
            >
                {optionsList}
            </select>
        </div>
    );
};
