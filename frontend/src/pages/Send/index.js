import React from 'react';
import SendHeaderComponent from './SendHeaderComponent';
import SendBodyComponent from './SendBodyComponent';
import SendFooterComponent from './SendFooterComponent';

import './styles.scss';

const SendAssetsPage = () => {
  return (
    <div className="custom-page">
      <div className="send-assets-page">
        <SendHeaderComponent />

        <SendBodyComponent />

        <SendFooterComponent />
      </div>
    </div>
  );
};

export default SendAssetsPage;
