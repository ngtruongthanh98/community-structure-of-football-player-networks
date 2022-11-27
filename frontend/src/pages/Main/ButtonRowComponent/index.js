import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../components/IconButton';
import SendIcon from './assets/send-icon.svg';
import SwapIcon from './assets/swap-icon.svg';
import DepositIcon from './assets/deposit-icon.svg';
import './styles.scss';

const ButtonRowComponent = (props) => {
  return (
    <div className="button-row-component">
      <IconButton source={DepositIcon} buttonName="Deposit" isDisabled />

      <IconButton source={SendIcon} buttonName="Send" onClick={props.onClickSend} />

      <IconButton source={SwapIcon} buttonName="Swap" isDisabled />
    </div>
  );
};

ButtonRowComponent.propTypes = {
  onClickSend: PropTypes.func.isRequired,
};

export default ButtonRowComponent;
