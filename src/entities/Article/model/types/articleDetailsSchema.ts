import { Article } from './article';

export type ArticleDetailsSchema = {
    isLoading: boolean;
    data?: Article;
    error?: string;
};
