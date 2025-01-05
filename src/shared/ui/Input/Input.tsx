import {
    ChangeEvent,
    type InputHTMLAttributes,
    memo,
    useEffect,
    useRef
} from 'react';
import { classNames } from 'shared/lib/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

type InputProps = HTMLInputProps & {
    className?: string;
    value?: string;
    autoFocus?: boolean;
    onChange?: (value: string) => void;
};

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autoFocus,
        ...restProps
    } = props;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    };
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }
    }, [autoFocus]);

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}

            <input
                ref={ref}
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHandler}
                {...restProps}
            />
        </div>
    );
});
