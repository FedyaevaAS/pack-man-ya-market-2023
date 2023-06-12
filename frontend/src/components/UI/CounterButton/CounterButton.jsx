import React, { useState } from 'react';
import styles from './CounterButton.module.scss';

const CounterButton = ({ counter }) => {
  const [isScanned, setIsScanned] = useState(false);

  const handleClick = () => {
    setIsScanned(!isScanned);
  };

  return (
    <button
      className={`${styles.counter} ${isScanned ? styles.scanned : ''}`}
      onClick={handleClick}>
      {counter} шт.
    </button>
  );
};

export default CounterButton;
