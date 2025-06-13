import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '../../constants';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesListSchema } from '../types/articlePageSchema';

const initialState: ArticlesListSchema = {
    isLoading: false,
    error: undefined,
    view: 'grid',
    page: 1,
    hasMore: true,
    entities: {},
    ids: [],
};

export const articlesAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
});

const articleCommentsSlice = createSlice({
    name: 'articlesList',
    initialState,
    reducers: {
        setView(state, action: PayloadAction<ArticleListView>) {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        initView(state) {
            const view = (
                localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleListView
                ?? 'grid'
            );
            state.view = view;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                const articles = action.payload;
                articlesAdapter.addMany(state, articles);

                state.isLoading = false;
                state.hasMore = articles.length > 0;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                state.hasMore = false;
            });
    },
});

export const { actions: articlesListActions } = articleCommentsSlice;
export const { reducer: articlesListReducer } = articleCommentsSlice;
