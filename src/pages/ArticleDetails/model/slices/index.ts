import { combineReducers } from '@reduxjs/toolkit';

import type { ArticleDetailsPageSchema } from '../types';
import { articleCommentsReducer } from './articleCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleCommentsReducer,
});
