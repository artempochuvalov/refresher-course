import type { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

export type ArticlesListSchema = EntityState<Article> & {
    isLoading: boolean;
    error?: string;
    view: ArticleListView;
    page: number;
    hasMore: boolean;
};
