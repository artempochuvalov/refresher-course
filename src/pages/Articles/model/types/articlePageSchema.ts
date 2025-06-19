import type { EntityState } from '@reduxjs/toolkit';
import type { Article, ArticleListView, ArticleType } from 'entities/Article';
import type { ArticleFilterField, ArticleFilterOrder } from 'features/Article/ArticleFilters';

export type ArticlesListSchema = EntityState<Article> & {
    isLoading: boolean;
    error?: string;
    view: ArticleListView;
    page: number;
    limit: number;
    hasMore: boolean;
    sortField?: ArticleFilterField;
    sortOrder?: ArticleFilterOrder;
    search?: string;
    sortType?: ArticleType;
    _mounted: boolean;
};
