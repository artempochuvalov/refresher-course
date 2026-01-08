import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { ListBox, ListBoxAnchorPosition, ListBoxOption } from 'shared/ui/ListBox/ListBox';

import { Currency } from '../../model/types';

type CurrencySelectProps = {
    className?: string;
    value?: Currency;
    anchorPosition?: ListBoxAnchorPosition;
    readonly?: boolean;
    onChange?: (value: Currency) => void;
};

const options: ListBoxOption<Currency>[] = Object.values(Currency).map((currency) => ({
    content: currency,
    value: currency,
}));

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        value,
        anchorPosition,
        readonly,
        className,
        onChange,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            value={value}
            options={options}
            label={t('Выберите валюту')}
            disabled={readonly}
            anchorPosition={anchorPosition}
            onChange={onChangeHandler}
        />
    );
});
