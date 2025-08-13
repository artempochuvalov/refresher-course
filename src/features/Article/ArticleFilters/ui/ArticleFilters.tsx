import { ArticleType } from 'entities/Article';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';

import { ArticleFilterField, ArticleFilterOrder } from '../model/types';
import cls from './ArticleFilters.module.scss';

type ArticleFiltersProps = {
    className?: string;
    field?: ArticleFilterField;
    order?: ArticleFilterOrder;
    search?: string;
    type: ArticleType;
    onFieldChange: (field: ArticleFilterField) => void;
    onOrderChange: (order: ArticleFilterOrder) => void;
    onTypeChange: (type: ArticleType) => void;
    onSearch: (search: string) => void;
};

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const {
        field,
        order,
        search,
        type,
        className,
        onFieldChange,
        onOrderChange,
        onSearch,
        onTypeChange,
    } = props;

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

    const sortTypeTabs = useMemo<TabItem<ArticleType>[]>(() => [
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука'),
        },
        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.ALL,
            content: t('Все'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticleFilters, {}, [className])}>
            <Card className={cls.sortFilters}>
                <Select
                    options={sortFieldOptions}
                    value={field}
                    onChange={onFieldChange}
                    label={t('Сортировать по ')}
                />

                <Select
                    options={sortOrderOptions}
                    value={order}
                    onChange={onOrderChange}
                    label={t('порядок')}
                />
            </Card>

            <Card className={cls.searchCard}>
                <Input value={search} onChange={onSearch} placeholder={t('Поиск')} />
            </Card>

            <Tabs
                className={cls.tabs}
                tabs={sortTypeTabs}
                value={type}
                onTabClick={onTypeChange}
            />
        </div>
    );
});
