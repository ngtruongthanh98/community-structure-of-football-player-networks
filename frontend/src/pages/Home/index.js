import React, { useState, useEffect } from 'react';
import './styles.scss';
import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';
import { Button } from '@nextui-org/react';
import { getPlayer, getPlayerDetail } from '../../services/player';
import { Card, Text } from '@nextui-org/react';
import { getLabelArray, getStatsArray } from '../../utils';

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});

  // const getLabelArray = (dataArray) => {
  //   if (!dataArray) return [];
  //   else {
  //     const labelArray = dataArray.map((item) => {
  //       return item.name;
  //     });
  //     return labelArray;
  //   }
  // };

  // const getStatsArray = (dataArray) => {
  //   if (!dataArray) return [];
  //   else {
  //     const statsArray = dataArray.map((item) => {
  //       return item.value;
  //     });
  //     return statsArray;
  //   }
  // };

  const handleRemovePlayer = () => {
    setValue([]);
    setPlayerName('');
    setPlayerId('');
  };

  async function fetchUserList(name) {
    if (name === '') {
      return [];
    }

    return getPlayer(name).then((res) => {
      const returnedValue = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      return returnedValue;
    });
  }

  useEffect(() => {
    if (!playerId) return;

    getPlayerDetail(playerId).then((res) => {
      setPlayerData(res.data);
    });
  }, [playerId]);

  return (
    <div className="homepage">
      <div className="search-box">
        <div className="title">Search by player name</div>
        <DebounceSelect
          mode="multiple"
          value={value}
          placeholder="Find player name"
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          style={{
            width: '300px',
          }}
          onSelect={(option) => {
            setValue(option);
            setPlayerName(option.label);
            setPlayerId(option.value);
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

            <div className="detail-information">
              <Card
                isHoverable
                variant="bordered"
                className="player-stats-card"
                css={{ mw: '400px' }}
              >
                <Card.Header>
                  <Text b>Player Statistics</Text>
                </Card.Header>

                <Card.Divider />

                <Card.Body>
                  <Text>ID: {playerData.id}</Text>
                  <Text>Position: {playerData.positions && playerData.positions.join(', ')}</Text>
                  <Text>DoB: {playerData.birth}</Text>
                  <Text>Height: {playerData.height} (cm)</Text>
                  <Text>Weight: {playerData.weight} (kg)</Text>
                </Card.Body>
              </Card>

              <RadarChart
                playerName={playerName}
                statsLabelArray={getLabelArray(playerData.attributes)}
                statsDataArray={getStatsArray(playerData.attributes)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
