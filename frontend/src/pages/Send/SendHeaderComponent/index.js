import React from 'react';
import IconBack from './assets/go-back-icon.svg';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const SendHeaderComponent = () => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/main');
  };

  return (
    <div className="send-header-component">
      <div className="back-button" onClick={onClickBack} aria-hidden="true">
        <img src={IconBack} alt="Back" />
      </div>

      <div className="title">Send Assets</div>
    </div>
  );
};

export default SendHeaderComponent;
