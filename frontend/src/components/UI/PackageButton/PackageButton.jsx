import React, { useEffect, useState } from 'react';
import styles from './PackageButton.module.scss'; // Импорт стилей из SCSS

const PackageButton = ({ boxType, setAllScanned }) => {
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setAllScanned(1);
  };

  useEffect(() => {
    setButtonText(boxType);
    setButtonStyle(boxType.toLowerCase());
  }, [boxType]);

  return (
    <button
      className={`${styles.button} ${styles[buttonStyle]} ${isActive ? styles.active : ''}`}
      onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default PackageButton;
