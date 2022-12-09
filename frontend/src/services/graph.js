import axios from 'axios';

export const buildGraph = (body) => {
  const url = `http://localhost:9999/build/graph`;
  return axios.post(url, body);
};

export const getPlayersInGraph = (playerId, count) => {
  const url = `http://localhost:9999/graph/${playerId}/${count}`;
  return axios.get(url);
};
