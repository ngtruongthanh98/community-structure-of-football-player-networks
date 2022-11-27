import React, { useState } from 'react';
import './styles.scss';

import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';

const Home = () => {
  const [value, setValue] = useState([]);

  const fetchPlayerData = () => {};

  return (
    <div className="homepage">
      <div className="search-box">
        <DebounceSelect
          mode="multiple"
          value={value}
          placeholder="Find player name"
          fetchOptions={fetchPlayerData}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          style={{
            width: '300px',
          }}
          onSelect={(value) => {
            setValue(value);
            console.log('select value', value);
          }}
          className="select-input"
        />
      </div>
      <div className="chart-box">
        <RadarChart />
      </div>
    </div>
  );
};

export default Home;
