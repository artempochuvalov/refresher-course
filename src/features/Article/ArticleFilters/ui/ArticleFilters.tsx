import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOption } from 'shared/ui/Select/Select';

import { ArticleFilterField, ArticleFilterOrder } from '../model/types';
import cls from './ArticleFilters.module.scss';

type ArticleFiltersProps = {
    className?: string;
};

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className } = props;

    const { t } = useTranslation();

    const sortFieldOptions = useMemo<SelectOption<ArticleFilterField>[]>(() => [
        {
            text: t('Время создания'),
            value: 'createdAt',
        },
        {
            text: t('Количество просмотров'),
            value: 'views',
        },
        {
            text: t('Название'),
            value: 'title',
        },
    ], [t]);

    const sortOrderOptions = useMemo<SelectOption<ArticleFilterOrder>[]>(() => [
        {
            text: t('По возрастанию'),
            value: 'asc',
        },
        {
            text: t('По убыванию'),
            value: 'desc',
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticleFilters, {}, [className])}>
            <Card className={cls.sortFilters}>
                <Select
                    options={sortFieldOptions}
                    label={t('Сортировать по ')}
                />

                <Select
                    options={sortOrderOptions}
                    label={t('порядок')}
                />
            </Card>

            <Card className={cls.searchCard}>
                <Input placeholder={t('Поиск')} />
            </Card>
        </div>
    );
});
