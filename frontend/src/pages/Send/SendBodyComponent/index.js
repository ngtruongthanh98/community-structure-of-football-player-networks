import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../components/TextInput';
import StackIcon from '../assets/stack-icon.svg';
import USD_COIN from '../../Main/AssetBoxComponent/assets/USD-1.png';
import EUR_COIN from '../../Main/AssetBoxComponent/assets/EUR-1.png';
import YEN_COIN from '../../Main/AssetBoxComponent/assets/YEN-1.png';
import { USD_TO_VND_RATE, EUR_TO_VND_RATE, YEN_TO_VND_RATE } from '../../../constants/constants';
import { formatNumber } from '../../../utils';
import CustomPopup from '../../../components/CustomPopup';
import './styles.scss';

const SendBodyComponent = (props) => {
  const [showModal, setShowModal] = useState(false);

  const popupCloseHandler = () => {
    setShowModal(false);
  };

  const handleClickAssets = () => {
    setShowModal(true);
  };

  const renderAssetsModal = () => {
    return (
      <div className="asset-box-component">
        <div className="currency-box-list">
          <div className="currency-box-element">
            <img className="currency-icon" src={USD_COIN} alt="USD" />

            <div className="currency-value-box">
              <div className="foreign-coin">{formatNumber(props.USD_value)} USD</div>

              <div className="vnd-coin">{formatNumber(props.USD_value * USD_TO_VND_RATE)} VND</div>
            </div>
          </div>

          <div className="currency-box-element">
            <img className="currency-icon" src={EUR_COIN} alt="EUR" />

            <div className="currency-value-box">
              <div className="foreign-coin">{formatNumber(props.EUR_value)} EUR</div>

              <div className="vnd-coin">{formatNumber(props.EUR_value * EUR_TO_VND_RATE)} VND</div>
            </div>
          </div>

          <div className="currency-box-element">
            <img className="currency-icon" src={YEN_COIN} alt="YEN" />

            <div className="currency-value-box">
              <div className="foreign-coin">{formatNumber(props.YEN_value)} YEN</div>

              <div className="vnd-coin">{formatNumber(props.YEN_value * YEN_TO_VND_RATE)} VND</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <CustomPopup onClose={popupCloseHandler} show={showModal} title="Assets">
        {renderAssetsModal()}
      </CustomPopup>

      <div className="send-body-component">
        <TextInput
          titleLeft="From"
          className="my-wallet"
          isDisabled
          leftElement={
            <div className="text-box">
              <div className="text-1">My Wallet</div>
              <div className="text-2">(7300...3334)</div>
            </div>
          }
        />

        <TextInput titleLeft="To" />

        <TextInput
          titleLeft="Asset"
          leftElement={
            <div className="custom-box">
              <img src={EUR_COIN} alt="EUR"></img>
              <span className="value">EUR</span>
            </div>
          }
          rightElement={
            <img src={StackIcon} alt="Asset" onClick={handleClickAssets} aria-hidden="true" />
          }
          isDisabled
          className="asset"
        />

        <TextInput
          titleLeft="Amount"
          titleRight="available: 50 EUR"
          rightElement={<div className="text-component">MAX</div>}
        />
      </div>
    </React.Fragment>
  );
};

SendBodyComponent.defaultProps = {
  USD_value: 1000,
  EUR_value: 50,
  YEN_value: 10000,
};

SendBodyComponent.propTypes = {
  USD_value: PropTypes.number,
  EUR_value: PropTypes.number,
  YEN_value: PropTypes.number,
};

export default SendBodyComponent;
