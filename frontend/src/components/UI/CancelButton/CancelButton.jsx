import React from 'react';
import styles from './CancelButton.module.scss';
import cancelIcon from '../../../images/x-ico.svg';

const CancelButton = ({ onCancel }) => {
  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <button className={styles.cancelButton} onClick={handleCancel}>
      <img className={styles.icon} src={cancelIcon} alt="cancel button" />
    </button>
  );
};

export default CancelButton;
