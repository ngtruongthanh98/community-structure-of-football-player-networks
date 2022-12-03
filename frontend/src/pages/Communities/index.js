import React, { useState, useEffect } from 'react';
import './styles.scss';
import DebounceSelect from '../../components/DebounceSelect';
import { Checkbox, Button } from '@nextui-org/react';
import { fetchPlayerData } from '../../utils';

import SimilarPlayers from './SimilarPlayers';

const Communities = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [selectedArray, setSelectedArray] = React.useState([]);
  const [isShowSimilarPlayers, setIsShowSimilarPlayers] = useState(false);

  useEffect(() => {
    console.log('selectedArray: ', selectedArray);
  }, [selectedArray]);

  const handleRemovePlayer = () => {
    setValue([]);
    setPlayerName('');
    setSelectedArray([]);
    setIsShowSimilarPlayers(false);
  };

  const handleSubmit = () => {
    setIsShowSimilarPlayers(true);
  };

  return (
    <div className="communities-page">
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
          onSelect={(value) => {
            setValue([value]);
            setPlayerName(value.label);
          }}
          className="select-input"
        />

        {playerName && (
          <div className="information-box">
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

            <Checkbox.Group
              color="secondary"
              defaultValue={[]}
              label="Select categories"
              value={selectedArray}
              onChange={setSelectedArray}
            >
              <Checkbox value="defence">Defence</Checkbox>
              <Checkbox value="physical">Physical</Checkbox>
              <Checkbox value="speed">Speed</Checkbox>
              <Checkbox value="vision">Vision</Checkbox>
              <Checkbox value="attack">Attack</Checkbox>
              <Checkbox value="technique">Technique</Checkbox>
              {/* <Checkbox value="aerial">Aerial</Checkbox>
              <Checkbox value="mental">Mental</Checkbox> */}
            </Checkbox.Group>

            <Button auto color="gradient" rounded className="submit-btn" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}

        {isShowSimilarPlayers && <SimilarPlayers className="similar-players" />}
      </div>
    </div>
  );
};

export default Communities;
