import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from '../Modal/Modal.module.css';
const modalRoot = document.querySelector('#modalRoot');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const onEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div onClick={onBackDropClick} className={css.Overlay}>
      <div className={css.Modal}>{children} </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
