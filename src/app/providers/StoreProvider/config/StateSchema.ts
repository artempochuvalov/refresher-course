import type {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';

import { ArticleDetailsSchema } from '@/entities/Article';
import type { UserSchema } from '@/entities/User';
import type { LoginSchema } from '@/features/AuthByUsername';
import type { ProfileSchema } from '@/features/EditableProfileCard';
import type {
    ArticleDetailsPageSchema
} from '@/pages/ArticleDetails';
import { ArticlesListSchema } from '@/pages/Articles';
import { rtkApi } from '@/shared/api/rtkApi';
import { ScrollPositionSchema } from '@/widgets/Page';

export type StateSchema = {
    user: UserSchema;
    scrollPosition: ScrollPositionSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Async reducers
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    articlesList?: ArticlesListSchema;
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
};

export type ThunkConfig<T> = {
    rejectValue: T,
    extra: ThunkExtraArg;
    state: StateSchema;
};
