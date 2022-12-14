import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import DebounceSelect from '../../../components/DebounceSelect';
import { getPlayer } from '../../../services/player';
import { getPlayerInCommunity } from '../../../services/graph';
import { Grid, Radio, Table, Text, Button, Modal } from '@nextui-org/react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { setPlayerIdAction, setDataObjectAction } from '../../../store/actions';

// const algorithmList = ['KMeans', 'Louvain', 'Hierarchical'];

const FindSimilarPlayerViaAlgorithm = (props) => {
  const calledAlgorithms = useRef([]);

  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});

  const [algorithm, setAlgorithm] = useState('KMeans');

  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const summarizeData = useRef({
    playerId: undefined,
    KMeans: {},
    Louvain: {},
    Hierarchical: {},
  });

  const doSetPlayerId = (playerId) => {
    props.dispatch(setPlayerIdAction(playerId));
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

  const onGetPlayerData = async () => {
    if (!playerName) {
      setErrorMessage('Please enter player name');
      setVisible(true);
      return;
    }

    try {
      const response = await getPlayerInCommunity(playerId, algorithm);
      setPlayerData(response.data);

      // set calledAlgorithms
      if (!calledAlgorithms.current.includes(algorithm)) {
        calledAlgorithms.current.push(algorithm);

        summarizeData.current.playerId = playerId;
        summarizeData.current[algorithm] = response.data;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClearPlayerData = () => {
    setValue([]);
    setPlayerName('');
    setPlayerId('');
    setPlayerData({});
    calledAlgorithms.current = [];
    summarizeData.current = {
      playerId: undefined,
      KMeans: {},
      Louvain: {},
      Hierarchical: {},
    };
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log('props.initalState: ', props.initalState);
    console.log('summarizeData.current: ', summarizeData.current);
  });

  return (
    <div className="similar-players-page">
      <div className="title">Find similar players</div>

      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6} justify="center">
          <div className="input-container">
            <Text className="text-label">Enter player name</Text>
            <DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Enter a player name"
              fetchOptions={fetchUserList}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              style={{
                width: '300px',
              }}
              className="select-input"
              onSelect={(option) => {
                handleClearPlayerData();

                setValue(option);
                setPlayerName(option.label);

                setPlayerId(option.value);
                playerId.current = option.value;

                doSetPlayerId(option.value);
              }}
            />
          </div>
        </Grid>

        <Grid xs={12} md={6} justify="center">
          <Radio.Group
            label="Choose an algorithm"
            defaultValue="KMeans"
            value={algorithm}
            onChange={setAlgorithm}
            orientation="horizontal"
          >
            <Radio value="KMeans">K-Means</Radio>
            <Radio value="Louvain">Louvain</Radio>
            <Radio value="Hierarchical">Hierarchical</Radio>
          </Radio.Group>
        </Grid>
      </Grid.Container>

      <Button shadow color="primary" auto onPress={onGetPlayerData} className="submit-btn">
        Find similar players
      </Button>

      {!isEmpty(playerData) && (
        <div className="player-name-box">
          <Text>
            <Text b>Player: </Text>
            {playerData.name}
          </Text>

          <Button shadow color="error" auto onPress={handleClearPlayerData} className="clear-btn">
            Clear result
          </Button>
        </div>
      )}

      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={6} justify="center">
          {!isEmpty(playerData) && (
            <div className="similar-players-box">
              <Text>
                <Text b>Similar players: </Text>
              </Text>
              <Table
                css={{
                  height: 'auto',
                  minWidth: '500px',
                }}
                className="similar-players-table"
              >
                <Table.Header>
                  <Table.Column key="name" allowsSorting>
                    <Text b> Name</Text>
                  </Table.Column>
                  <Table.Column key="id" allowsSorting>
                    <Text b>ID</Text>
                  </Table.Column>
                  <Table.Column key="height" allowsSorting>
                    <Text b>Height</Text>
                  </Table.Column>
                  <Table.Column key="weight" allowsSorting>
                    <Text b>Weight</Text>
                  </Table.Column>
                  <Table.Column key="similarity" allowsSorting>
                    <Text b>Similarity</Text>
                  </Table.Column>
                </Table.Header>
                <Table.Body>
                  {playerData.similarPlayer &&
                    playerData.similarPlayer.map((item) => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.id}</Table.Cell>
                          <Table.Cell>{item.height}</Table.Cell>
                          <Table.Cell>{item.weight}</Table.Cell>
                          <Table.Cell>{item.similarity}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
          )}
        </Grid>

        <Grid xs={12} md={6} justify="center">
          {!isEmpty(playerData.executionProc) && (
            <div className="graph-comparision">
              <Text b>Graph Comparision</Text>

              <Table
                css={{
                  height: 'auto',
                  minWidth: '500px',
                }}
              >
                <Table.Header>
                  <Table.Column>
                    <Text b>Algorithm</Text>
                  </Table.Column>

                  {playerData?.executionProc.map((item) => {
                    return (
                      <Table.Column>
                        <Text b>{item.executionName}</Text>
                      </Table.Column>
                    );
                  })}
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Text b>Current:</Text> {algorithm}
                    </Table.Cell>
                    {playerData?.executionProc.map((item) => {
                      return <Table.Cell>{item.executionTime} (μs)</Table.Cell>;
                    })}
                  </Table.Row>

                  {!isEmpty(summarizeData.current.KMeans.executionProc) && (
                    <Table.Row>
                      <Table.Cell>KMeans</Table.Cell>
                      {summarizeData.current.KMeans.executionProc.map((item) => {
                        return <Table.Cell>{item.executionTime} (μs)</Table.Cell>;
                      })}
                    </Table.Row>
                  )}

                  {!isEmpty(summarizeData.current.Louvain.executionProc) && (
                    <Table.Row>
                      <Table.Cell>Louvain</Table.Cell>
                      {summarizeData.current.Louvain.executionProc.map((item) => {
                        return <Table.Cell>{item.executionTime} (μs)</Table.Cell>;
                      })}
                    </Table.Row>
                  )}

                  {!isEmpty(summarizeData.current.Hierarchical.executionProc) && (
                    <Table.Row>
                      <Table.Cell>Hierarchical</Table.Cell>
                      {summarizeData.current.Hierarchical.executionProc.map((item) => {
                        return <Table.Cell>{item.executionTime} (μs)</Table.Cell>;
                      })}
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          )}
        </Grid>
      </Grid.Container>

      {!isEmpty(playerData) && (
        <div className="image-box">
          <Text>
            Struture Community Graph - <Text b>{algorithm}</Text>
          </Text>
          <img
            src={playerData.graphURL || 'http://localhost:3000/no-image-available.png'}
            alt="graph"
            className="graph-image"
          />
        </div>
      )}

      <Modal
        closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={onCloseModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Notification
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{errorMessage}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onPress={onCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initalState: state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(FindSimilarPlayerViaAlgorithm);
