import type { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export type ArticleRecommendationsSchema = EntityState<Article> & {
    isLoading: boolean;
    error?: string;
};
