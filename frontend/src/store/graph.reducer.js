import { GraphActions } from './actions.js';

const graphReducer = (previousState = {}, action) => {
  switch (action.type) {
    case GraphActions.SET_PLAYER_ID:
      return {
        ...previousState,
        playerId: action.playerId,
      };
    case GraphActions.SET_DATA_OBJECT:
      return {
        ...previousState,
        dataObject: action.dataObject,
      };

    default:
      return previousState;
  }
};

export default graphReducer;
