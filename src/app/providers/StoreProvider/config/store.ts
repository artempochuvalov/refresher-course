import {
    type CombinedState,
    configureStore,
    type Reducer,
    type ReducersMapObject
} from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api';
import { rtkApi } from 'shared/api/rtkApi';
import { scrollPositionReducer } from 'widgets/Page';

import { createReducerManager } from './reducerManager';
import type { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        scrollPosition: scrollPositionReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,

        ...asyncReducers,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                },
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
