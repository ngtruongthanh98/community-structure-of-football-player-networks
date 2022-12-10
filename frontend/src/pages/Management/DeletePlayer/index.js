import React, { useState } from 'react';
import HomePage from '../../../pages/Home';
import { Input, Button, Modal, Text } from '@nextui-org/react';
import './styles.scss';
import { deletePlayer } from '../../../services/player';

const DeletePlayer = () => {
  const [playerId, setPlayerId] = useState('');
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);

  const onHandleDelete = () => {
    if (!playerId) {
      setErrorMessage('Please enter player id');
      setVisible(true);
      return;
    }

    setIsShowConfirmModal(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  const onCloseConfirmModal = () => {
    setIsShowConfirmModal(false);
  };

  const onDeleteConfirm = async () => {
    setIsShowConfirmModal(false);
    await deletePlayer(playerId);
    setPlayerId('');
  };

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
          value={playerId}
        />

        <Button auto color="gradient" rounded className="delete-btn" onClick={onHandleDelete}>
          Delete player
        </Button>
      </div>

      <HomePage />

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
        open={isShowConfirmModal}
        onClose={onCloseConfirmModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Notification
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Do you want to delete player {playerId}?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={onCloseConfirmModal} color="error">
            Cancel
          </Button>
          <Button auto flat onClick={onDeleteConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePlayer;
