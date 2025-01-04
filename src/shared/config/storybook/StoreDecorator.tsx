import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import type { Decorator } from '@storybook/react';
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => (Story) => (
    <StoreProvider
        initialState={state as StateSchema}
        asyncReducers={defaultReducers as ReducersMapObject<StateSchema>}
    >
        <Story />
    </StoreProvider>
);
