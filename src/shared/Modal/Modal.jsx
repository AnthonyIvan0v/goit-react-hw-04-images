import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  render() {
    const { close, urlLargeImage } = this.props;
    const { closeModal } = this;
    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal} onClick={close}>
          <img src={urlLargeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};
