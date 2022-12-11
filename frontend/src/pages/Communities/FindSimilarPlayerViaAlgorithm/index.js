import React, { useState } from 'react';
import './styles.scss';
import DebounceSelect from '../../../components/DebounceSelect';
import { getPlayer } from '../../../services/player';
import { getPlayerInCommunity } from '../../../services/graph';
import { Radio, Table, Text, Button, Modal } from '@nextui-org/react';
import { isEmpty } from 'lodash';

const FindSimilarPlayerViaAlgorithm = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});
  // const [playerData, setPlayerData] = useState({
  //   name: 'Cristiano Ronaldo',
  //   similarPlayers: [
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

  const onHandleClick = async () => {
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
    } catch (error) {
      console.log('error', error);
    }
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  return (
    <div className="similar-players-page">
      <div className="title">Find similar players</div>

      <div className="main-container">
        <div className="main-container__left">
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
            }}
          />
        </div>

        <div className="main-container__right">
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
        </div>
      </div>

      <Button shadow color="primary" auto onPress={onHandleClick} className="submit-btn">
        Find similar players
      </Button>

      {!isEmpty(playerData) && (
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
            <Table.Column key="name">Name</Table.Column>
            <Table.Column key="id">Id</Table.Column>
            <Table.Column key="height">Height</Table.Column>
            <Table.Column key="weight">Weight</Table.Column>
            <Table.Column key="similarity">Similarity</Table.Column>
          </Table.Header>
          <Table.Body>
            {playerData.similarPlayers.map((item) => {
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
      )}

      {!isEmpty(playerData) && (
        <img src={playerData.graphUrl} alt="graph" className="graph-image" />
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

export default FindSimilarPlayerViaAlgorithm;
