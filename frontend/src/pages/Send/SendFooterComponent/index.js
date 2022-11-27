import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NormalButton from '../../../components/NormalButton';
import CustomPopup from '../../../components/CustomPopup';
import './styles.scss';

const SendFooterComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClickSend = () => {
    setShowModal(true);
  };

  const onClickCancel = () => {
    navigate('/main');
  };

  return (
    <>
      <CustomPopup
        show={showModal}
        isCustomHeader
        customHeader={<div className="title">Successfully sent</div>}
        contentClassName="content-success-popup"
        customFooter={<NormalButton buttonName="OK" onClick={() => setShowModal(false)} />}
        customPopupClassName="popup-success"
      >
        <div className="text">
          Your <span className="bold">EUR</span> has been sent!
        </div>
        <div className="text">Thank you for using our service</div>
      </CustomPopup>

      <div className="send-footer-component">
        <NormalButton buttonName="Cancel" isWhite onClick={onClickCancel} />

        <NormalButton buttonName="Send" onClick={handleClickSend} />
      </div>
    </>
  );
};

export default SendFooterComponent;
