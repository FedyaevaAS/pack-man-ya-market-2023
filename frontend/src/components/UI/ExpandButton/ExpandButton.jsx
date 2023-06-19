import React from 'react';
import styles from './ExpandButton.module.scss';

const ExpandButton = ({ onClick, buttonText, buttonLogo, isCanceled }) => {
  return (
    <button className={styles.expandButton} onClick={onClick}>
      <span className={`${isCanceled ? styles.disabled : styles.expandButtonText}`}>
        {buttonText}
      </span>
      <img
        className={`${isCanceled ? styles.disabledLogo : styles.expandButtonLogo}`}
        src={buttonLogo}
        alt="check-mark"
      />
    </button>
  );
};

export default ExpandButton;
