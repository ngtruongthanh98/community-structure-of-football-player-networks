import axios from 'axios';

export const getPlayer = (playerName) => {
  const url = `http://localhost:9999/recommend/${playerName}`;
  return axios.get(url);
};

export const getPlayerDetail = (playerId) => {
  const url = `http://localhost:9999/player/${playerId}`;
  return axios.get(url);
};

export const addNewPlayer = (data) => {
  const url = `http://localhost:9999/player/add`;
  return axios.post(url, data);
};

export const deletePlayer = (playerId) => {
  const url = `http://localhost:9999/player/delete/${playerId}`;
  return axios.delete(url);
};
