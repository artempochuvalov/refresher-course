import type { AsyncThunkAction } from '@reduxjs/toolkit';
import type { StateSchema } from 'app/providers/StoreProvider';
import axios, { type AxiosStatic } from 'axios';

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

type ActionCreator<Return, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<
    Return,
    Arg,
    { rejectValue: RejectedValue }
>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreator<Return, Arg, RejectedValue>;

    navigate: jest.MockedFn<any>;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg);
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        });

        return result;
    }

    constructor(
        actionCreator: ActionCreator<Return, Arg, RejectedValue>,
        state?: DeepPartial<StateSchema>
    ) {
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);
        this.actionCreator = actionCreator;

        this.api = mockedAxios;
        this.navigate = jest.fn();
    }
}
