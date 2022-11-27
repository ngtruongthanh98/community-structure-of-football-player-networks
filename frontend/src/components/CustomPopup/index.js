import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from './assets/close-icon.svg';
import './styles.scss';
import classNames from 'classnames';
const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className="overlay"
    >
      <div className={classNames('popup', props.customPopupClassName)}>
        {props.isCustomHeader ? (
          <div className="custom-header">{props.customHeader}</div>
        ) : (
          <div className="header">
            <div className="title">{props.title}</div>
            <span className="close-btn" onClick={closeHandler}>
              <img src={CloseIcon} alt="Close" />
            </span>
          </div>
        )}
        <div className={classNames('content', props.contentClassName)}>{props.children}</div>

        {props.customFooter && <div className="custom-footer">{props.customFooter}</div>}
      </div>
    </div>
  );
};

CustomPopup.defaultProps = {
  onClose: () => {},
  isCustomHeader: false,
  customHeader: null,
  title: '',
  contentClassName: '',
  customFooter: null,
  customPopupClassName: '',
};

CustomPopup.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  isCustomHeader: PropTypes.bool,
  customHeader: PropTypes.element,
  contentClassName: PropTypes.string,
  customFooter: PropTypes.element,
  customPopupClassName: PropTypes.string,
};

export default CustomPopup;
