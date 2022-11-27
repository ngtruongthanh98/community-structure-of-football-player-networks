import React from 'react';
import PropTypes from 'prop-types';
import EUR_COIN from './assets/EUR-1.png';
import YEN_COIN from './assets/YEN-1.png';

import { EUR_TO_VND_RATE, YEN_TO_VND_RATE } from '../../../constants/constants';
import { formatNumber } from '../../../utils';
import './styles.scss';

const AssetBoxComponent = (props) => {
  return (
    <div className="asset-box-component">
      <div className="asset-box-component-title">Assets</div>
      <div className="currency-box-list">
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

AssetBoxComponent.defaultProps = {
  EUR_value: 50,
  YEN_value: 10000,
};

AssetBoxComponent.propTypes = {
  EUR_value: PropTypes.number,
  YEN_value: PropTypes.number,
};

export default AssetBoxComponent;
