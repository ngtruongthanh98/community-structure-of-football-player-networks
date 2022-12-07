import React, { useState } from 'react';
import './styles.scss';
import { Input, Button, Image } from '@nextui-org/react';
import _ from 'lodash';

const Management = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerPositions, setPlayerPositions] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [yearOfBirth, setYearOfBirth] = useState(0);

  const [playerAttributes, setPlayerAttributes] = useState([]);
  const [playerAttributeValues, setPlayerAttributeValues] = useState([]);

  const handleSubmit = () => {
    const positions = playerPositions.split(',');
    const attributes = playerAttributes.split(',');
    const attributeValues = playerAttributeValues.split(',');

    if (attributes.length === 0 || attributeValues.length === 0) {
      return;
    }

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

    console.log('playerData: ', playerData);
  };

  return (
    <div className="management-page">
      <div className="add-player-container">
        <div className="title">Add new player</div>

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
          Add player
        </Button>
      </div>
    </div>
  );
};

export default Management;
