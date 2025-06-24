import { ArticleCommentsSchema } from './articleCommentsSchema';
import { ArticleRecommendationsSchema } from './articleRecommendationsSchema';

export type ArticleDetailsPageSchema = {
    comments: ArticleCommentsSchema;
    recommendations: ArticleRecommendationsSchema;
};
