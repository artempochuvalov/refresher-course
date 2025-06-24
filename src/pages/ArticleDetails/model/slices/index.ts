import { combineReducers } from '@reduxjs/toolkit';

import type { ArticleDetailsPageSchema } from '../types';
import { articleCommentsReducer } from './articleCommentsSlice';
import { articleRecommendationsReducer } from './articleRecommendations';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleCommentsReducer,
    recommendations: articleRecommendationsReducer,
});
