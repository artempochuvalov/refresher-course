import {
    type ChangeEvent,
    memo,
    useCallback,
    useMemo
} from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Select.module.scss';

export type SelectOption = {
    value: string;
    text: string;
};

type SelectProps = {
    className?: string;
    label?: string;
    value?: string;
    options?: SelectOption[];
    onChange?: (value: string) => void;
};

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
    } = props;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);

    const optionsList = useMemo(() => (
        options?.map(({ value, text }) => (
            <option className={cls.option} value={value}>
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
                className={cls.select}
                value={value}
                onChange={handleOnChange}
            >
                {optionsList}
            </select>
        </div>
    );
});
