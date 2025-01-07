import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Select, type SelectOption } from 'shared/ui/Select/Select';

import { Currency } from '../../model/types';

type CurrencySelectProps = {
    className?: string;
    value?: Currency;
    readonly?: boolean;
    onChange?: (value: Currency) => void;
};

const options: SelectOption[] = Object.values(Currency).map((currency) => ({
    text: currency,
    value: currency,
}));

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        value,
        className,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            value={value}
            options={options}
            label={t('Выберите валюту')}
            readonly={readonly}
            onChange={onChangeHandler}
        />
    );
});
