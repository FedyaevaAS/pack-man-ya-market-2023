import React from 'react';
import styles from './ExpandButton.module.scss';

const ExpandButton = ({ onClick, buttonText, buttonLogo }) => {
  return (
    <button className={styles.expandButton} onClick={onClick}>
      <span className={styles.expandButtonText}>{buttonText}</span>
      <img className={styles.expandButtonLogo} src={buttonLogo} alt="check-mark" />
    </button>
  );
};

export default ExpandButton;
