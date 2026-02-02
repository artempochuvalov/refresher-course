import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleListView, ArticleType } from '@/entities/Article';
import {
    type ArticleFilterField,
    type ArticleFilterOrder,
    ArticleFilters
} from '@/features/Article/ArticleFilters';
import { ArticleViewSwitcher } from '@/features/Article/ViewSwitcher';
import { articlesListActions } from '@/pages/Articles/model/slices/articlePageSlice';
import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { HStack, VStack } from '@/shared/ui/Stack';

import {
    getArticlesListSearch,
    getArticlesListSortField,
    getArticlesListSortOrder,
    getArticlesListSortType,
    getArticlesListView
} from '../../model/selectors/articlesListSelectors';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';

type ArticlesPageFiltersProps = {
    className?: string;
};

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const sortField = useSelector(getArticlesListSortField);
    const sortOrder = useSelector(getArticlesListSortOrder);
    const search = useSelector(getArticlesListSearch);
    const sortType = useSelector(getArticlesListSortType);
    const view = useSelector(getArticlesListView);

    const onChangeView = useCallback((view: ArticleListView) => {
        dispatch(articlesListActions.setView(view));
    }, [dispatch]);

    const onChangeFilter = useCallback(() => {
        dispatch(articlesListActions.setPage(1));
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debouncedChangeFilter = useDebounce(onChangeFilter, 300);

    const onSortFieldChange = useCallback((sortField: ArticleFilterField) => {
        dispatch(articlesListActions.setSortField(sortField));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSortOrderChange = useCallback((sortOrder: ArticleFilterOrder) => {
        dispatch(articlesListActions.setSortOrder(sortOrder));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    const onSearch = useCallback(async (search: string) => {
        dispatch(articlesListActions.setSearch(search));
        debouncedChangeFilter();
    }, [debouncedChangeFilter, dispatch]);

    const onSortTypeChange = useCallback((sortType: ArticleType) => {
        dispatch(articlesListActions.setSortType(sortType));
        onChangeFilter();
    }, [dispatch, onChangeFilter]);

    return (
        <VStack fullWidth gap="16" className={classNames('', {}, [className])}>
            <ArticleFilters
                field={sortField}
                order={sortOrder}
                search={search}
                type={sortType}
                onFieldChange={onSortFieldChange}
                onOrderChange={onSortOrderChange}
                onSearch={onSearch}
                onTypeChange={onSortTypeChange}
            />

            <HStack fullWidth justify="end">
                <ArticleViewSwitcher
                    view={view}
                    onChangeView={onChangeView}
                />
            </HStack>
        </VStack>
    );
});
