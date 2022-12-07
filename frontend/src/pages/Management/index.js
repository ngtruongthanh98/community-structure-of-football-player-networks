import React, { useState } from 'react';
import './styles.scss';
import { Input, Button, Image } from '@nextui-org/react';

const Management = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerPositions, setPlayerPositions] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [statsArray, setStatsArray] = useState([]);

  const handleSubmit = () => {
    console.log('Player name: ', playerName);
    console.log('Player positions: ', playerPositions);
  };

  return (
    <div className="management-page">
      {/* Add new player */}
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
