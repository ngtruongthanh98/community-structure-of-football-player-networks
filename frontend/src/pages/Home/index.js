import React, { useState, useEffect } from 'react';
import './styles.scss';
import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';
import { Button } from '@nextui-org/react';
import { getPlayer, getPlayerDetail } from '../../services/player';
import { Card, Text, Grid } from '@nextui-org/react';
import { getLabelArray, getStatsArray } from '../../utils';
import Skeleton from 'react-loading-skeleton';
import { isEmpty } from 'lodash';

const attributeTitle = ['Name', 'ID', 'Position', 'DoB', 'Height', 'Weight'];

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});

  const handleRemovePlayer = () => {
    setValue([]);
    setPlayerName('');
    setPlayerId('');
  };

  async function fetchUserList(name) {
    if (name === '') {
      return [];
    }

    const res = await getPlayer(name);
    const returnedValue = res.data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    return returnedValue;
  }

  useEffect(() => {
    if (!playerId) return;

    setPlayerData({});

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

                {isEmpty(playerData) ? (
                  <Card.Body>
                    <Grid.Container gap={2}>
                      {attributeTitle.map((item, index) => (
                        <Grid xs={12} key={index}>
                          <div className="flex-box">
                            <span>
                              <Text b>{item}:</Text>
                            </span>{' '}
                            <Skeleton
                              height={20}
                              width={150}
                              className="player-statistic-skeleton"
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid.Container>
                  </Card.Body>
                ) : (
                  <Card.Body>
                    <Grid.Container gap={2}>
                      {attributeTitle.map((item, index) => (
                        <Grid xs={12} key={index}>
                          <div className="flex-box">
                            <span>
                              <Text b>{item}:</Text>
                            </span>{' '}
                            <Text>{playerData[item]}</Text>
                          </div>
                        </Grid>
                      ))}
                    </Grid.Container>
                  </Card.Body>
                )}
              </Card>

              {isEmpty(playerData) ? (
                <Skeleton height={500} width={500} />
              ) : (
                <RadarChart
                  playerName={playerName}
                  statsLabelArray={getLabelArray(playerData.attributes)}
                  statsDataArray={getStatsArray(playerData.attributes)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
