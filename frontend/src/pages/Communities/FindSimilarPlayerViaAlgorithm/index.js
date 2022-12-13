import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';
import DebounceSelect from '../../../components/DebounceSelect';
import { getPlayer } from '../../../services/player';
import { getPlayerInCommunity } from '../../../services/graph';
import { Grid, Radio, Table, Text, Button, Modal } from '@nextui-org/react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { setPlayerIdAction, setDataObjectAction } from '../../../store/actions';

const algorithmList = ['KMeans', 'Louvain', 'Hierachical'];

const FindSimilarPlayerViaAlgorithm = (props) => {
  const calledAlgorithms = useRef([]);

  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});
  // const [playerName, setPlayerName] = useState('Ronaldo'); //! test
  // const [playerId, setPlayerId] = useState('777'); // ! test
  // const [playerData, setPlayerData] = useState({
  //   name: 'Cristiano Ronaldo',
  //   similarPlayer: [
  //     {
  //       name: 'Lionel Messi',
  //       id: 1,
  //       similarity: 0.9,
  //       height: 170,
  //       weight: 70,
  //     },
  //     {
  //       name: 'Neymar',
  //       id: 2,
  //       similarity: 0.8,
  //       height: 175,
  //       weight: 75,
  //     },
  //     {
  //       name: 'Kylian Mbappe',
  //       id: 3,
  //       similarity: 0.7,
  //       height: 180,
  //       weight: 80,
  //     },
  //   ],
  //   graphUrl: 'https://i.imgur.com/1Q9ZQ9r.png',
  // });

  const [algorithm, setAlgorithm] = useState('KMeans');

  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const tableObject = {
    playerId: undefined,
    kmeams: {},
    louvain: {},
    hierarchical: {},
  };

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

    console.log('playerName', playerName);
    console.log('playerId', playerId);
    console.log('algorithm', algorithm);

    try {
      const response = await getPlayerInCommunity(playerId, algorithm);
      setPlayerData(response.data);

      // set calledAlgorithms
      if (!calledAlgorithms.current.includes(algorithm)) {
        calledAlgorithms.current.push(algorithm);
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
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log('props.initalState: ', props.initalState);

    console.log('calledAlgorithms.current: ', calledAlgorithms.current);
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
                setValue(option);
                setPlayerName(option.label);
                setPlayerId(option.value);
                doSetPlayerId(option.value);

                // set graph data to default when change player
                const dataObject = {
                  playerId: option.value,
                  kmeams: {},
                  louvain: {},
                  hierarchical: {},
                };

                props.dispatch(setDataObjectAction(dataObject));
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
            <Radio value="Hierachical">Hierachical</Radio>
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

      {!isEmpty(playerData) && (
        <div className="similar-players-box">
          <Text>
            <Text b>Similar players: </Text>
          </Text>
          <Table
            aria-label="Example static collection table"
            css={{
              height: 'auto',
              minWidth: '500px',
            }}
            selectionMode="single"
            className="similar-players-table"
          >
            <Table.Header>
              <Table.Column key="name" allowsSorting>
                Name
              </Table.Column>
              <Table.Column key="id" allowsSorting>
                Id
              </Table.Column>
              <Table.Column key="height" allowsSorting>
                Height
              </Table.Column>
              <Table.Column key="weight" allowsSorting>
                Weight
              </Table.Column>
              <Table.Column key="similarity" allowsSorting>
                Similarity
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

      {!isEmpty(playerData) && (
        <div className="image-box">
          <Text>
            Struture Community Graph - <Text b>{algorithm}</Text>
          </Text>
          <img src={playerData.graphURL} alt="graph" className="graph-image" />
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
