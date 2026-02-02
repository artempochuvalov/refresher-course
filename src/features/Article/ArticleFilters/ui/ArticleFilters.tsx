import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { ListBox, ListBoxOption } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Tabs } from '@/shared/ui/Tabs/Tabs';

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

    const sortFieldOptions = useMemo<ListBoxOption<ArticleFilterField>[]>(() => [
        {
            content: t('Время создания'),
            value: 'createdAt',
        },
        {
            content: t('Количество просмотров'),
            value: 'views',
        },
        {
            content: t('Название'),
            value: 'title',
        },
    ], [t]);

    const sortOrderOptions = useMemo<ListBoxOption<ArticleFilterOrder>[]>(() => [
        {
            content: t('По возрастанию'),
            value: 'asc',
        },
        {
            content: t('По убыванию'),
            value: 'desc',
        },
    ], [t]);

    const sortTypeTabs = useMemo<ListBoxOption<ArticleType>[]>(() => [
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
        <VStack fullWidth gap="16" className={classNames('', {}, [className])}>
            <Card className={cls.filterCard}>
                <HStack fullWidth gap="8" align="center">
                    <ListBox
                        options={sortFieldOptions}
                        value={field}
                        onChange={onFieldChange}
                        label={t('Сортировать по ')}
                    />

                    <ListBox
                        options={sortOrderOptions}
                        value={order}
                        onChange={onOrderChange}
                        label={t('порядок')}
                    />
                </HStack>
            </Card>

            <Card className={cls.filterCard}>
                <Input value={search} onChange={onSearch} placeholder={t('Поиск')} />
            </Card>

            <Tabs
                tabs={sortTypeTabs}
                value={type}
                onTabClick={onTypeChange}
            />
        </VStack>
    );
});
