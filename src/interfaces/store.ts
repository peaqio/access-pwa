import { initializeStore } from '../store';

export type IStore = ReturnType<typeof initializeStore>;
export type IState = ReturnType<IStore['getState']>;
