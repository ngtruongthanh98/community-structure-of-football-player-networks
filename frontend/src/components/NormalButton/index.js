import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const NormalButton = (props) => {
  return (
    <div
      className={classnames('custom-button', props.isWhite ? '--is-white' : '', props.className)}
      onClick={props.onClick}
      aria-hidden="true"
    >
      <div className={classnames('button-name', props.isWhite ? '--is-blue' : '')}>
        {props.buttonName}
      </div>
    </div>
  );
};

NormalButton.defaultProps = {
  buttonName: '',
  onClick: () => {},
  isWhite: false,
  className: '',
};

NormalButton.propTypes = {
  buttonName: PropTypes.string,
  onClick: PropTypes.func,
  isWhite: PropTypes.bool,
  className: PropTypes.string,
};

export default NormalButton;
