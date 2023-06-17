import React, { useState } from 'react';
import styles from './PackageButton.module.scss'; // Импорт стилей из SCSS

const PackageButton = ({ boxType, packageType, setAllScanned }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setAllScanned(1);
  };

  let buttonStyle;
  let buttonText;

  if (boxType && styles[boxType]) {
    buttonStyle = styles[boxType];
    buttonText = boxType;
  } else if (packageType && styles[packageType]) {
    buttonStyle = styles[packageType];
    buttonText = packageType;
  } else {
    buttonStyle = styles.default;
    buttonText = 'Default';
  }

  return (
    <button
      className={`${styles.button} ${buttonStyle} ${isActive ? styles.active : ''}`}
      onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default PackageButton;
