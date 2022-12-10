import axios from 'axios';

export const buildGraph = (body) => {
  const url = `http://localhost:9999/graph/build`;
  return axios.post(url, body);
};

export const getPlayersInGraph = (playerId, count) => {
  const url = `http://localhost:9999/graph/${playerId}/${count}`;
  return axios.get(url);
};

export const getAttribute = (attribute) => {
  const url = `http://localhost:9999/graph/${attribute}`;
  return axios.get(url);
};

// ###############################

export const getPlayerInCommunity = (playerId, algorithm) => {
  const url = `http://localhost:9999/graph/${playerId}/${algorithm}`;
  return axios.get(url);
};
