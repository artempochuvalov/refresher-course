import type { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

export type ArticleCommentsSchema = EntityState<Comment> & {
    isLoading: boolean;
    error?: string;
};
