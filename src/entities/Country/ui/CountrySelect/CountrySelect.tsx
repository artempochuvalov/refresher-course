import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Select, type SelectOption } from 'shared/ui/Select/Select';

import { Country } from '../../model/types';

type CountrySelectProps = {
    className?: string;
    value?: Country;
    readonly?: boolean;
    onChange?: (value: Country) => void;
};

const countryNames: Record<Country, string> = {
    Russia: 'Россия',
    Belarus: 'Беларусь',
    Ukraine: 'Украина',
    Kazakhstan: 'Казахстан',
    Armenia: 'Армения',
    Georgia: 'Грузия',
};

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        value,
        className,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation();

    const options: SelectOption[] = useMemo(() => (
        Object.values(Country).map((country: Country) => ({
            text: t(countryNames[country]),
            value: country,
        }))
    ), [t]);

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            value={value}
            options={options}
            label={t('Выберите страну')}
            readonly={readonly}
            onChange={onChangeHandler}
        />
    );
});
