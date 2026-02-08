import type { Feedback } from '@/entities/Feedback';
import { rtkApi } from '@/shared/api/rtkApi';

type GetArticleFeedbackOptions = {
    userId: string;
    articleId: string;
};

type LeaveArticleFeedbackOptions = {
    userId: string;
    articleId: string;
    stars: number;
    feedback?: string;
};

const articleFeedbackApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleFeedback: build.query<
            Feedback[],
            GetArticleFeedbackOptions
        >({
            query: ({ userId, articleId }) => ({
                url: '/articles-feedback',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        leaveArticleFeedback: build.mutation<
            void,
            LeaveArticleFeedbackOptions
        >({
            query: ({
                userId,
                articleId,
                stars,
                feedback,
            }) => ({
                url: '/articles-feedback',
                method: 'POST',
                body: {
                    userId,
                    articleId,
                    stars,
                    feedback,
                },
            }),
        }),
    }),
});

export const useArticleFeedback = (
    articleFeedbackApi.useGetArticleFeedbackQuery
);
export const useLeaveArticleFeedback = (
    articleFeedbackApi.useLeaveArticleFeedbackMutation
);
