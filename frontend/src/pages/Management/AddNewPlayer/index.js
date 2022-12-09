import React, { useState, useEffect } from 'react';
import './styles.scss';
import _ from 'lodash';
import { Input, Button, Image, Modal, Text } from '@nextui-org/react';
import { PrettyPrintJson } from '../../../utils';

const AddNewPlayer = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerPositions, setPlayerPositions] = useState('');
  const [weight, setWeight] = useState(undefined);
  const [height, setHeight] = useState(undefined);
  const [yearOfBirth, setYearOfBirth] = useState(undefined);

  const [playerAttributes, setPlayerAttributes] = useState('');
  const [playerAttributeValues, setPlayerAttributeValues] = useState('');
  const [playerData, setPlayerData] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const [isShowReviewModal, setIsShowReviewModal] = useState(false);

  const handleSubmit = () => {
    if (!playerName) {
      setErrorMessage('Please enter player name');
      setVisible(true);
      return;
    }

    if (!playerPositions) {
      setErrorMessage('Please enter player positions');
      setVisible(true);
      return;
    }

    if (!playerAttributes) {
      setErrorMessage('Please enter player attributes');
      setVisible(true);
      return;
    }

    if (!playerAttributeValues) {
      setErrorMessage('Please enter player attribute values');
      setVisible(true);
      return;
    }

    const positions = playerPositions.split(',');
    const attributes = playerAttributes.split(',');
    const attributeValues = playerAttributeValues.split(',');

    const attributeObject = {};

    _.forEach(attributes, (attribute, index) => {
      attributeObject[attribute] = attributeValues[index];
    });

    const playerData = {
      name: playerName,
      positions: positions,
      weight: weight,
      height: height,
      yearOfBirth: yearOfBirth,
      attributes: attributeObject,
    };

    setPlayerData(playerData);
    setIsShowReviewModal(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const closeHandlerReviewModal = () => {
    setIsShowReviewModal(false);
  };

  const onSubmitReviewModal = () => {
    console.log('onSubmitReviewModal');
    setIsShowReviewModal(false);
  };

  useEffect(() => {
    console.log('playerPositions: ', playerPositions);
  }, [playerPositions]);

  return (
    <div className="player-container">
      <div className="title">Add a player</div>

      <Image
        src="https://the18.com/sites/default/files/u100013226/20171004-The18-Image-Field.jpg"
        alt="Default Image"
        objectFit="cover"
        className="position-map-image"
      />

      <div className="input-container">
        <div className="input-container__column">
          <Input
            clearable
            label="Player name"
            placeholder="Enter player name"
            bordered
            color="primary"
            onChange={(e) => setPlayerName(e.target.value)}
            className="next-input"
            width="300px"
          />

          <Input
            clearable
            label="Positions"
            placeholder="Enter player positions"
            bordered
            color="primary"
            helperText="Enter positions separated by comma"
            onChange={(e) => setPlayerPositions(e.target.value)}
            className="next-input"
            width="300px"
          />

          <Input
            clearable
            label="Year of birth"
            placeholder="Enter player year of birth"
            bordered
            color="primary"
            onChange={(e) => setYearOfBirth(e.target.value)}
            className="next-input"
            width="300px"
          />
        </div>

        <div className="input-container__column">
          <Input
            clearable
            label="Weight"
            placeholder="Enter player weight"
            bordered
            color="primary"
            onChange={(e) => setWeight(e.target.value)}
            className="next-input"
            width="300px"
          />

          <Input
            clearable
            label="Height"
            placeholder="Enter player height"
            bordered
            color="primary"
            onChange={(e) => setHeight(e.target.value)}
            className="next-input"
            width="300px"
          />

          <Input
            clearable
            label="Attributes"
            placeholder="Enter attributes"
            bordered
            color="primary"
            helperText="Enter attributes separated by comma"
            onChange={(e) => setPlayerAttributes(e.target.value)}
            className="next-input"
            width="300px"
          />

          <Input
            clearable
            label="Attribute values"
            placeholder="Enter attribute values"
            bordered
            color="primary"
            helperText="Enter attribute values separated by comma"
            onChange={(e) => setPlayerAttributeValues(e.target.value)}
            className="next-input"
            width="300px"
          />
        </div>
      </div>

      <Button className="next-btn" shadow color="primary" auto onPress={handleSubmit}>
        Review data
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
          <Text>{errorMessage}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={isShowReviewModal}
        onClose={closeHandlerReviewModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Review Data
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <PrettyPrintJson data={playerData} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={closeHandlerReviewModal}>
            Cancel
          </Button>
          <Button auto flat color="success" onClick={onSubmitReviewModal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddNewPlayer;
