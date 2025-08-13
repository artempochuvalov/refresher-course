import { StateSchema } from 'app/providers/StoreProvider';

import { commentsAdapter } from '../slices/articleCommentsSlice';

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments ?? commentsAdapter.getInitialState()
);
export const getArticleCommentsIsLoading = (state: StateSchema) => (
    state.articleDetailsPage?.comments?.isLoading ?? false
);
export const getArticleCommentsFetchError = (state: StateSchema) => (
    state.articleDetailsPage?.comments?.fetchCommentsError
);
export const getArticleCommentAddError = (state: StateSchema) => (
    state.articleDetailsPage?.comments?.addCommentError
);
