import type { Reducer } from '@reduxjs/toolkit';
import type {
    ReduxStoreWithReducerManager,
    StateSchemaKey
} from 'app/providers/StoreProvider/config/StateSchema';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

type DynamicModuleLoaderProps = {
    reducers: ReducersList;
    keepOnUnmount?: boolean;
};

export const useDynamicModuleLoader = ({
    reducers,
    keepOnUnmount,
}: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithReducerManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([key, reducer]) => {
            const hasReducer = store.reducerManager.getReducerMap()[key as StateSchemaKey];
            if (!hasReducer) {
                store.reducerManager.add(key as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${key} module` });
            }
        });

        return () => {
            if (keepOnUnmount) {
                return;
            }

            Object.keys(reducers).forEach((key) => {
                store.reducerManager.remove(key as StateSchemaKey);
                dispatch({ type: `@DESTROY ${key} module` });
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
