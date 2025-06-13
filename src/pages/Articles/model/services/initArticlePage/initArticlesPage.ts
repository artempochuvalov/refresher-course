import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { getArticlesListIsMounted } from '../../selectors/articlesListSelectors';
import { articlesListActions } from '../../slices/articlePageSlice';
import { fetchNextArticles } from '../fetchNextArticles/fetchNextArticles';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'articles/initArticlesPage',
    async (_, { getState, dispatch }) => {
        const isMounted = getArticlesListIsMounted(getState());

        if (!isMounted) {
            dispatch(articlesListActions.initState());
            dispatch(fetchNextArticles());
        }
    }
);
