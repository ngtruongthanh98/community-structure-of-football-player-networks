import { createStore } from 'redux';
import graphReducer from './graph.reducer';

export const defaultState = {
  playerId: undefined,
  dataObject: undefined,
};

export const store = createStore(graphReducer, defaultState);
