import React from 'react';
import styles from './Footer.module.scss';
import keyboard from '../../images/keyboard-logo.svg';

const Footer = ({ withOutBackButton, withOutKeyboardButton, openPopup }) => {
  const handleOpen = () => {
    openPopup(true);
  };

  return (
    <>
      <footer className={styles.footer}>
        {withOutBackButton && (
          <button className={styles['footer__back-button']} onClick={() => openPopup(false)}>
            Назад
          </button>
        )}
        {!withOutKeyboardButton && (
          <button onClick={handleOpen} className={styles['footer__keyboard-button']}>
            <img src={keyboard} alt="keyboard-logo" />
            Ввести с клавиатуры
          </button>
        )}
      </footer>
    </>
  );
};

export default Footer;
