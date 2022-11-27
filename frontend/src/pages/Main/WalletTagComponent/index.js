import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from './assets/copy-icon.svg';
import RoninWhiteIcon from './assets/ronin-white.svg';
import { USD_TO_VND_RATE, SERIAL_NUMBER } from '../../../constants/constants';
import { formatNumber } from '../../../utils';
import './styles.scss';

const WalletTagComponent = (props) => {
  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="wallet-tag-component">
      <div className="wallet-header">
        <div className="info">
          <div className="name">My Wallet</div>
          <span className="serial-number">{`(${SERIAL_NUMBER})`}</span>
        </div>

        <img
          className="icon-copy"
          src={CopyIcon}
          alt="Copy Icon"
          onClick={copyToClipboard(`${SERIAL_NUMBER}`)}
          aria-hidden="true"
        />
      </div>

      <div className="divider-bottom"></div>

      <div className="wallet-body">
        <div className="balance">
          <div className="usd">{formatNumber(props.USD_value)} USD</div>
          <div className="vnd">{formatNumber(props.USD_value * USD_TO_VND_RATE)} VND </div>
        </div>

        <img src={RoninWhiteIcon} alt="Ronin White Icon" />
      </div>
    </div>
  );
};

WalletTagComponent.defaultProps = {
  USD_value: 1000,
};

WalletTagComponent.propTypes = {
  USD_value: PropTypes.number,
};

export default WalletTagComponent;
