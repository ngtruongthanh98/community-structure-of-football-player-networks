import React, { useState } from 'react';
import './styles.scss';

import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';
import { Button } from '@nextui-org/react';
import { fetchPlayerData } from '../../utils';

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');

  //! Temp data
  const statsDataArray = [6, 10, 18, 14, 15, 17, 6, 11];

  const handleRemovePlayer = () => {
    setValue([]);
    setPlayerName('');
  };

  return (
    <div className="homepage">
      <div className="search-box">
        <div className="title">Search by player name</div>
        <DebounceSelect
          mode="multiple"
          value={value}
          placeholder="Find player name"
          fetchOptions={() => fetchPlayerData(playerName)}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          style={{
            width: '300px',
          }}
          onSelect={(option) => {
            setValue([option]);
            setPlayerName(option.value);
          }}
          className="select-input"
        />
      </div>

      <div className="chart-box">
        {playerName && (
          <div className="chart-box__body">
            <div className="title">
              Current player: <span className="title-content"> {playerName}</span>
              <Button
                auto
                color="error"
                rounded
                className="remove-btn"
                onClick={handleRemovePlayer}
              >
                Remove
              </Button>
            </div>

            <RadarChart playerName={playerName} statsDataArray={statsDataArray} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
