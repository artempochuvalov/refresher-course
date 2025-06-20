import type { ReducersMapObject } from '@reduxjs/toolkit';
import type { Decorator } from '@storybook/react';
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { articlesListReducer } from 'pages/Articles/model/slices/articlePageSlice';
import { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader';

const defaultReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articlesList: articlesListReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList
): Decorator => (Story) => (
    <StoreProvider
        initialState={state as StateSchema}
        asyncReducers={{ ...defaultReducers as ReducersMapObject<StateSchema>, ...asyncReducers }}
    >
        <Story />
    </StoreProvider>
);
