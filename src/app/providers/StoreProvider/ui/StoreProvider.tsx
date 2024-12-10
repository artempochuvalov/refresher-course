import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

type StoreProviderProps = {
    children?: ReactNode;
    initialState?: StateSchema;
};

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const { children, initialState } = props;

    return (
        <Provider store={createReduxStore(initialState)}>
            {children}
        </Provider>
    );
};
