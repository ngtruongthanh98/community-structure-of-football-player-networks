import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const IconButton = (props) => {
  return (
    <div
      className={classnames(
        'custom-icon-button',
        props.isDisabled ? '--disabled' : '',
        props.className
      )}
    >
      <div className="icon-button-box" onClick={props.onClick} aria-hidden="true">
        <img src={props.source} alt="Icon" />
      </div>
      <div className="icon-button-name">{props.buttonName}</div>
    </div>
  );
};

IconButton.defaultProps = {
  iconComponent: null,
  source: '',
  onClick: () => {},
  isDisabled: false,
  className: '',
  buttonName: '',
};

IconButton.propTypes = {
  iconComponent: PropTypes.element,
  source: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  buttonName: PropTypes.string,
};

export default IconButton;
