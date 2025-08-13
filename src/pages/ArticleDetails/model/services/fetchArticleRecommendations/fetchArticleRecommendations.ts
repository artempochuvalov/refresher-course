import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

import { RECOMMENDATIONS_SIZE } from '../../../constants';

export const fetchRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articleDetails/fetchRecommendations',
    async (_, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: RECOMMENDATIONS_SIZE,
                },
            });

            const articles = response.data;
            if (!articles) {
                throw new Error();
            }

            return articles;
        } catch (error) {
            console.error(error);
            return rejectWithValue('error');
        }
    }
);
