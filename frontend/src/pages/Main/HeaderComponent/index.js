import React from 'react';
import CircleIcon from '../../../assets/ellipse-icon.svg';
import AvatarIcon from './assets/avatar-icon.svg';
import './styles.scss';

const HeaderComponent = () => {
  return (
    <div className="header-main-page">
      <div className="left-side">
        <img src={CircleIcon} alt="circle-icon" />

        <div className="wallet-name">Ronin Wallet</div>
      </div>

      <div className="right-side">
        <img src={AvatarIcon} alt="avatar-icon" />
      </div>
    </div>
  );
};

export default HeaderComponent;
