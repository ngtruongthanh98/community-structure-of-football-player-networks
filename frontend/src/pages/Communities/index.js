import React, { useState, useEffect } from 'react';
import './styles.scss';
import DebounceSelect from '../../components/DebounceSelect';
import { Checkbox, Modal, Button, Text, Loading } from '@nextui-org/react';
import { getPlayer, getPlayerDetail } from '../../services/player';
import SimilarPlayers from './SimilarPlayers';
import { getLabelArray, getStatsArray } from '../../utils';

const Communities = () => {
  const [value, setValue] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerData, setPlayerData] = useState({});
  const [attributes, setAttributes] = useState([]);

  const [topStats, setTopStats] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [isShowSimilarPlayers, setIsShowSimilarPlayers] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!playerId) return;

    getPlayerDetail(playerId).then((res) => {
      setPlayerData(res.data);
    });
  }, [playerId]);

  useEffect(() => {
    if (!playerData) return;
    setTopStats(getLabelArray(playerData.attributes));
    setAttributes(playerData.attributes);
  }, [playerData]);

  const handleRemovePlayer = () => {
    setValue([]);
    setPlayerName('');
    setSelectedArray([]);
    setIsShowSimilarPlayers(false);
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

  const handleSubmit = () => {
    if (selectedArray.length < 3) {
      setVisible(true);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsShowSimilarPlayers(true);

      setIsLoading(false);
    }, 1000);
  };

  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  return (
    <div className="communities-page">
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
              label="Select top categories"
              value={selectedArray}
              onChange={setSelectedArray}
            >
              {attributes &&
                attributes.map((item) => <Checkbox value={item}>{item.name}</Checkbox>)}
            </Checkbox.Group>

            <Button auto color="gradient" rounded className="submit-btn" onClick={handleSubmit}>
              Submit
            </Button>

            <Modal
              closeButton
              animated={false}
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  <Text b size={18}>
                    Notification
                  </Text>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Text>Please select at least 3 categories</Text>
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat onClick={closeHandler}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}

        <div className="detail-information">
          {isLoading ? (
            <Loading>Finding similar players</Loading>
          ) : (
            isShowSimilarPlayers && (
              <SimilarPlayers
                className="similar-players"
                playerName={playerName}
                topStats={topStats}
                statsLabelArray={getLabelArray(selectedArray)}
                statsDataArray={getStatsArray(selectedArray)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
