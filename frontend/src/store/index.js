import { createStore } from 'redux';
import graphReducer from './graph.reducer';

export const defaultState = {
  playerId: undefined,
  dataObject: {
    playerId: undefined,
    kmeams: {},
    louvain: {},
    hierarchical: {},
  },
};

export const store = createStore(graphReducer, defaultState);
