import React, { useState, useEffect } from 'react';
import styles from './CounterButton.module.scss';

const CounterButton = ({
  counter,
  disabled,
  onClick,
  scanned,
  onScanSubmit,
  barcode,
  isCanceled,
  calculatorValue
}) => {
  const [isScanned, setIsScanned] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onScanSubmit) {
      onScanSubmit(1);
    }

    setIsScanned(!isScanned);
  };

  useEffect(() => {
    if (calculatorValue && calculatorValue === barcode) {
      handleClick();
    }
  }, [calculatorValue]);

  return (
    <button
      className={`${isCanceled ? styles.disabled : styles.counter} ${
        isScanned || scanned ? styles.scanned : ''
      }`}
      onClick={handleClick}
      disabled={disabled || isScanned}>
      {counter} шт.
    </button>
  );
};

export default CounterButton;
