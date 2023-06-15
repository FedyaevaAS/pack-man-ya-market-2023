import React, { useState } from 'react';
import styles from './CounterButton.module.scss';

const CounterButton = ({ counter, disabled, onClick, scanned, onScanSubmit }) => {
  const [isScanned, setIsScanned] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onScanSubmit) {
      onScanSubmit(1);
    }

    setIsScanned(!isScanned);
  };

  return (
    <button
      className={`${styles.counter} ${isScanned || scanned ? styles.scanned : ''}`}
      onClick={handleClick}
      disabled={disabled || isScanned}>
      {counter} шт.
    </button>
  );
};

export default CounterButton;
