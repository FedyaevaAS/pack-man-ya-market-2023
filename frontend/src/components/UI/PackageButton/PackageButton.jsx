import React, { useEffect, useState } from 'react';
import styles from './PackageButton.module.scss'; // Импорт стилей из SCSS

const PackageButton = ({ boxType, packageType, setAllScanned }) => {
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setAllScanned(1);
  };

  useEffect(() => {
    setButtonText(boxType);
    setButtonStyle(boxType);
  }, [boxType]);

  /*   let buttonStyle;
  let buttonText; */

  /*     if (boxType && styles[boxType]) {
      buttonStyle = styles[boxType];
      setButtonText(boxType);
    } else if (boxType && styles[packageType]) {
      setButtonStyle(boxType);
      setButtonText(boxType);
    } else {
      setButtonStyle(styles.default);
      setButtonText('Default');
    } */

  return (
    <button
      className={`${styles.button} ${buttonStyle} ${isActive ? styles.active : ''}`}
      onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default PackageButton;
