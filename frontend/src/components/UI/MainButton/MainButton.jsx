import React from 'react';
import styles from './MainButton.module.scss';

const MainButton = ({ text, disabled, onClick }) => {
  return (
    <div className={styles.mainButton}>
      <button
        className={`${
          text === 'Есть проблема' ? styles.mainButton__problem : styles.mainButton__ready
        }`}
        disabled={disabled}
        onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
