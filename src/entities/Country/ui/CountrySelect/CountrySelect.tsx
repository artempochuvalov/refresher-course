import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { ListBox, ListBoxOption } from 'shared/ui/Popups';
import { PopupAnchorPosition } from 'shared/ui/Popups/model/types';

import { Country } from '../../model/constants';

type CountrySelectProps = {
    className?: string;
    anchorPosition?: PopupAnchorPosition;
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
            defaultValue={String(options[0].content)}
            options={options}
            label={t('Выберите страну')}
            disabled={readonly}
            anchorPosition={anchorPosition}
            onChange={onChangeHandler}
        />
    );
});
