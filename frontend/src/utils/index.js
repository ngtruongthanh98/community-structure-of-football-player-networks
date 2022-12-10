export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const PrettyPrintJson = ({ data }) => (
  <div>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export const getLabelArray = (dataArray) => {
  if (!dataArray) return [];
  else {
    const labelArray = dataArray.map((item) => {
      return item.name;
    });
    return labelArray;
  }
};

export const getStatsArray = (dataArray) => {
  if (!dataArray) return [];
  else {
    const statsArray = dataArray.map((item) => {
      return item.value;
    });
    return statsArray;
  }
};
