import React, { useState } from 'react';
import HomePage from '../../../pages/Home';
import { Input, Button } from '@nextui-org/react';
import './styles.scss';

const DeletePlayer = () => {
  const [playerId, setPlayerId] = useState('');
  const onHandleDelete = () => {};

  return (
    <div className="player-container">
      <div className="title">Delete a player</div>

      <div className="controller-container">
        <Input
          clearable
          label="Player ID"
          placeholder="Enter player id"
          bordered
          color="primary"
          onChange={(e) => {
            setPlayerId(e.target.value);
          }}
          className="next-input"
          width="300px"
        />

        <Button auto color="gradient" rounded className="delete-btn" onClick={onHandleDelete}>
          Delete player
        </Button>
      </div>

      {playerId}

      <HomePage />
    </div>
  );
};

export default DeletePlayer;
