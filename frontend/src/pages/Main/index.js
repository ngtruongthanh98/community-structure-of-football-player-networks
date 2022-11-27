import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import WalletTagComponent from './WalletTagComponent';
import ButtonRowComponent from './ButtonRowComponent';
import AssetBoxComponent from './AssetBoxComponent';
import './styles.scss';

const MainPage = () => {
  const navigate = useNavigate();

  const onClickSend = () => {
    navigate('/send');
  };

  return (
    <div className="custom-page">
      <div className="main-page">
        <HeaderComponent />

        <WalletTagComponent />

        <ButtonRowComponent onClickSend={onClickSend} />

        <AssetBoxComponent />
      </div>
    </div>
  );
};

export default MainPage;
