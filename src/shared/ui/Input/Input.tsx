import {
    ChangeEvent,
    type InputHTMLAttributes,
    type KeyboardEvent,
    memo,
    useCallback,
    useEffect,
    useRef
} from 'react';
import { classNames, type ClassNamesMods } from 'shared/lib/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'disabled' | 'readOnly' | 'type'
>;

type InputProps = HTMLInputProps & {
    className?: string;
    value?: string;
    autoFocus?: boolean;
    onChange?: (value: string) => void;
    readonly?: boolean;
    numeric?: boolean;
};

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autoFocus,
        readonly,
        numeric,
        ...restProps
    } = props;

    const ref = useRef<HTMLInputElement | null>(null);

    const type = numeric ? 'number' : 'text';

    const mods: ClassNamesMods = {
        [cls.readonly]: readonly,
    };

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (numeric && /\D/.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    }, [numeric]);

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}

            <input
                ref={ref}
                disabled={readonly}
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onKeyDown}
                {...restProps}
            />
        </div>
    );
});
