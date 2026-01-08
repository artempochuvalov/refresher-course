import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { ListBox, ListBoxAnchorPosition, ListBoxOption } from 'shared/ui/ListBox/ListBox';

import { Country } from '../../model/types';

type CountrySelectProps = {
    className?: string;
    anchorPosition?: ListBoxAnchorPosition;
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
        anchorPosition,
        className,
        readonly,
        onChange,
    } = props;

    const { t } = useTranslation();

    const options: ListBoxOption<Country>[] = useMemo(() => (
        Object.values(Country).map((country: Country) => ({
            content: t(countryNames[country]),
            value: country,
        }))
    ), [t]);

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            value={value}
            options={options}
            label={t('Выберите страну')}
            disabled={readonly}
            anchorPosition={anchorPosition}
            onChange={onChangeHandler}
        />
    );
});
