import React, { useState, useEffect } from 'react';
import './styles.scss';

import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');

  const fetchPlayerData = () => {};

  //! Temp data
  const statsDataArray = [6, 10, 18, 14, 15, 17, 6, 11];

  useEffect(() => {
    console.log('playerName: ', playerName);
  }, [playerName]);

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
            setValue([value]);
            console.log('select value', value);

            setPlayerName(value.label);
          }}
          className="select-input"
        />
      </div>

      <div className="chart-box">
        {playerName && (
          <div className="chart-box__body">
            <div className="title">
              Current player: <span className="title-content">{playerName}</span>
            </div>
            <RadarChart playerName={playerName} statsDataArray={statsDataArray} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
