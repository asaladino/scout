import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type Scan = {
  domain: string,
  output: string,
  overallCompleted: number,
  overallTotal: number,
  overStatus: string,
  taskCompleted: number,
  taskTotal: number,
  taskStatus: string
};

export type Action = {
  +type: string
};

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
