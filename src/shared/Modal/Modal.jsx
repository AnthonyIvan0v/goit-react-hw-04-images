import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, urlLargeImage }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={close}>
        <img src={urlLargeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};
