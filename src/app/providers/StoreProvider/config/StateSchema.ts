import type {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import type { ProfileSchema } from 'entities/Profile';
import type { UserSchema } from 'entities/User';
import type { LoginSchema } from 'features/AuthByUsername';
import type { NavigateFunction } from 'react-router-dom';

export type StateSchema = {
    user: UserSchema;

    // Async reducers
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
};

export type StateSchemaKey = keyof StateSchema;

export type ReducerManager = {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
};

export type ReduxStoreWithReducerManager = EnhancedStore<StateSchema> & {
    reducerManager: ReducerManager;
};

type ThunkExtraArg = {
    api: AxiosInstance;
    navigate?: NavigateFunction;
};

export type ThunkConfig<T> = {
    rejectValue: T,
    extra: ThunkExtraArg;
    state: StateSchema;
};
