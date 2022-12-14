export const GraphActions = {
  SET_PLAYER_ID: 'SET_PLAYER_ID',
  SET_DATA_OBJECT: 'SET_DATA_OBJECT',
};

export const setPlayerIdAction = (playerId) => ({
  type: GraphActions.SET_PLAYER_ID,
  playerId,
});

export const setDataObjectAction = (dataObject) => ({
  type: GraphActions.SET_DATA_OBJECT,
  dataObject,
});
