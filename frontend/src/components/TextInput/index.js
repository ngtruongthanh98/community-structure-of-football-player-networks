import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import eyeIcon from '../../assets/eye-icon.svg';
import eyeSlashIcon from '../../assets/eye-slash-icon.svg';
import './styles.scss';

const TextInput = (props) => {
  const [inputType, setInputType] = useState('text');

  const onChange = (e) => {
    const { value } = e.target;
    props.onChange(props.name, value);
  };

  const onClick = () => {
    if (inputType === 'text') {
      setInputType('password');
    } else {
      setInputType('text');
    }
  };

  useEffect(() => {
    if (props.isPasswordInput) {
      setInputType('password');
    }
  }, [props.isPasswordInput]);

  return (
    <div className={classnames('custom-text-input', props.className)}>
      <div className="title-box">
        <div className="title-left">{props.titleLeft}</div>
        {props.titleRight && <div className="title-right">{props.titleRight}</div>}
      </div>

      <div className="input-box">
        <input
          className={classnames(
            'custom-input',
            props.isDisabled ? '--disabled' : '',
            props.isError ? '--error' : ''
          )}
          type={inputType}
          value={props.value}
          name={props.name}
          onChange={onChange}
          placeholder={props.placeholder}
          disabled={props.isDisabled}
        />

        <div className="error-message">{props.errorMessage}</div>

        {!!props.value && props.isPasswordInput && (
          <div className="eye-icon" onClick={onClick}>
            {inputType === 'text' ? (
              <img src={eyeIcon} alt="Eye Icon"></img>
            ) : (
              <img src={eyeSlashIcon} alt="Eye Slash Icon"></img>
            )}
          </div>
        )}

        {!!props.leftElement && <div className="left-element">{props.leftElement}</div>}

        {!!props.rightElement && <div className="right-element">{props.rightElement}</div>}
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  value: undefined,
  name: '',
  onChange: () => {},
  titleLeft: '',
  titleRight: '',
  isPasswordInput: true,
  rightElement: null,
  leftElement: null,
  placeholder: '',
  className: '',
  isDisabled: false,
  isError: false,
  errorMessage: '',
};

TextInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  isPasswordInput: PropTypes.bool,
  rightElement: PropTypes.element,
  leftElement: PropTypes.element,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default TextInput;
