import React, { useState, useEffect } from 'react';
import './styles.scss';

import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';
import { Button } from '@nextui-org/react';

import { getPlayerData } from '../../services/player';

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');

  //! Temp data
  const statsDataArray = [6, 10, 18, 14, 15, 17, 6, 11];

  async function fetchPlayerData(playerName) {
    console.log('fetching person', playerName);
    return getPlayerData(playerName).then((res) => {
      const returnedValue = res.data.map(elem => (
        {
          label: `${elem.name}`,
          value: elem.name
        }
      ));

      return returnedValue;
    });
  }

  useEffect(() => {
    if (!playerName) {
      return;
    }

    fetchPlayerData(playerName).then((res) => {
      console.log(res.data);
      setValue([res.data]);
    });
  }, [playerName]);

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
          fetchOptions={fetchPlayerData}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          style={{
            width: '300px',
          }}
          onSelect={(option) => {
            setValue([option]);
            console.log('select value', option.value);

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
