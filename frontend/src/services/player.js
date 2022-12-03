import axios from 'axios';

export const getPlayerData = (playerName) => {
  const url = `http://localhost:9999/recommend/${playerName}`;
  return axios.get(url);
};
