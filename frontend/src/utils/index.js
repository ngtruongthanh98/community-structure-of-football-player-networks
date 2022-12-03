import { getPlayerData } from '../services/player';

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const fetchPlayerData = (name) => {
  if (!name) {
    return;
  }

  return getPlayerData(name).then((res) => {
    const returnedValue = res.data.map((elem) => ({
      label: `${elem.name}`,
      value: elem.name,
    }));

    return returnedValue;
  });
};
