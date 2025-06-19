import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleListView, ArticleType } from 'entities/Article';
import { ArticleFilterField, ArticleFilterOrder } from 'features/Article/ArticleFilters';

import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '../../constants';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesListSchema } from '../types/articlePageSchema';

const initialState: ArticlesListSchema = {
    isLoading: false,
    error: undefined,
    view: 'grid',
    page: 1,
    limit: 9,
    hasMore: true,
    _mounted: false,
    sortField: undefined,
    sortOrder: undefined,
    search: undefined,
    sortType: undefined,
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

            state.limit = state.view === 'grid' ? 9 : 3;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setSortField(state, action: PayloadAction<ArticleFilterField>) {
            state.sortField = action.payload;
        },
        setSortOrder(state, action: PayloadAction<ArticleFilterOrder>) {
            state.sortOrder = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setSortType(state, action: PayloadAction<ArticleType>) {
            state.sortType = action.payload;
        },
        initState(state) {
            const view = (
                localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleListView
                ?? 'grid'
            );
            state.view = view;

            state._mounted = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                const articles = action.payload;

                state.isLoading = false;
                state.hasMore = articles.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, articles);
                } else {
                    articlesAdapter.addMany(state, articles);
                }
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
