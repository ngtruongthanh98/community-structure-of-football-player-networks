import React, { useState, useCallback, useRef } from 'react';
import TextInput from '../../components/TextInput';
import NormalButton from '../../components/NormalButton';

import LogoIcon from '../../assets/ronin-fullcolor.svg';

import { useNavigate } from 'react-router-dom';

import './styles.scss';
import { ACCOUNT_PASSWORD } from '../../constants/constants';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const passwordStorage = useRef(ACCOUNT_PASSWORD);

  const navigate = useNavigate();

  const onChange = useCallback((name, value) => {
    setPassword(value);
    setIsErrorMessage(false);
  }, []);

  const onClickUnlock = () => {
    if (password === passwordStorage.current) {
      navigate('/main');
    } else {
      setIsErrorMessage(true);
    }
  };

  return (
    <div className="custom-page">
      <div className="login-page">
        <img className="logo" src={LogoIcon} alt="Logo" />

        <div className="title-1">Ronin Wallet</div>
        <div className="title-2">Your Digital Passport</div>

        <TextInput
          value={password}
          name={password}
          onChange={onChange}
          titleLeft="enter password"
          placeholder="Enter your password"
          isError={isErrorMessage}
          errorMessage={
            isErrorMessage && password !== passwordStorage.current ? 'Incorrect password' : ''
          }
        />

        <NormalButton className="unlock-btn" buttonName="Unlock" onClick={onClickUnlock} />
      </div>
    </div>
  );
};

export default LoginPage;
