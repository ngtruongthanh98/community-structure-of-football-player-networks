import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import RadarChart from '../../components/Charts/RadarChart';
import DebounceSelect from '../../components/DebounceSelect';
import { Button } from '@nextui-org/react';
import { getPlayer, getPlayerDetail } from '../../services/player';
import { Card, Text, Grid } from '@nextui-org/react';
import { getLabelArray, getStatsArray } from '../../utils';
import Skeleton from 'react-loading-skeleton';
import { isEmpty } from 'lodash';

const attributeTitle = ['Name', 'ID', 'Positions', 'Birth', 'Height', 'Weight'];

const Home = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});
  const isLoadFirstTime = useRef(true);

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
      isLoadFirstTime.current = false;
    });
  }, [playerId]);

  return (
    <div className="homepage">
      <div className="search-box">
        <Card isHoverable className="search-card">
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
        </Card>
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
              <Grid.Container gap={2} justify="center">
                <Grid xs={12} md={6} justify="center">
                  <Card
                    isHoverable
                    variant="bordered"
                    className="player-stats-card"
                    css={{ mw: '500px' }}
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
                              <Grid xs={6}>
                                <Text b>{item}:</Text>
                              </Grid>
                              <Grid xs={6}>
                                <Skeleton
                                  height={20}
                                  width={100}
                                  className="player-statistic-skeleton"
                                />
                              </Grid>
                            </Grid>
                          ))}
                        </Grid.Container>
                      </Card.Body>
                    ) : (
                      <Card.Body>
                        <Grid.Container gap={2}>
                          {attributeTitle.map((item, index) => (
                            <Grid xs={12} key={index}>
                              <Grid xs={6}>
                                <Text b>{item}:</Text>
                              </Grid>
                              <Grid xs={6}>
                                {item === 'Positions' ? (
                                  playerData.positions && (
                                    <Text>
                                      {playerData.positions && playerData.positions.join(', ')}
                                    </Text>
                                  )
                                ) : (
                                  <Text>
                                    {item === 'Name'
                                      ? playerData.name
                                      : item === 'ID'
                                      ? playerData.id
                                      : item === 'Birth'
                                      ? playerData.birth
                                      : item === 'Height'
                                      ? playerData.height + ' (cm)'
                                      : item === 'Weight'
                                      ? playerData.weight + ' (kg)'
                                      : ''}
                                  </Text>
                                )}
                              </Grid>
                            </Grid>
                          ))}
                        </Grid.Container>
                      </Card.Body>
                    )}
                  </Card>
                </Grid>

                <Grid xs={12} md={6} justify="center">
                  {isEmpty(playerData) ? (
                    <Skeleton height={500} width={500} />
                  ) : (
                    <RadarChart
                      playerName={playerName}
                      statsLabelArray={getLabelArray(playerData.attributes)}
                      statsDataArray={getStatsArray(playerData.attributes)}
                    />
                  )}
                </Grid>
              </Grid.Container>
            </div>
          </div>
        )}
      </div>

      {isEmpty(playerData) && !playerName && isLoadFirstTime.current && (
        <div className="notification-box">
          <Card isHoverable className="notification-card">
            <div className="notification-card__title">Welcome to Football Player Stats</div>
            <div className="notification-card__content">
              This is a web application that allows you to search for football players and display
              their statistics and information.
            </div>
            <div className="notification-card__content">
              To get started, simply type in the name of the player you are looking for in the
              search bar above.
            </div>

            <img src="http://localhost:3000/football-player.png" alt="" className="player-image" />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Home;
