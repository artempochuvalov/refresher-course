import { StateSchema } from 'app/providers/StoreProvider';

import { commentsAdapter } from '../slices/articleCommentsSlice';

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleComments ?? commentsAdapter.getInitialState()
);
export const getArticleCommentsIsLoading = (state: StateSchema) => (
    state.articleComments?.isLoading ?? false
);
export const getArticleCommentsFetchError = (state: StateSchema) => (
    state.articleComments?.fetchCommentsError
);
export const getArticleCommentAddError = (state: StateSchema) => (
    state.articleComments?.addCommentError
);
