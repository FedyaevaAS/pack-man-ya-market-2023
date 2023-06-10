import React from 'react';
import styles from './Footer.module.scss';
import { useLocation } from 'react-router-dom';
import keyboard from '../../images/keyboard-logo.svg';
import Nda from '../Nda/Nda';

const Footer = ({ isCalculatorOpen, openPopup }) => {
  const handleOpen = () => {
    openPopup(true);
  };

  return (
    <>
      <footer className={styles.footer}>
        <button className={styles['footer__back-button']} onClick={() => openPopup(false)}>
          Назад
        </button>
        {!isCalculatorOpen && (
          <button onClick={handleOpen} className={styles['footer__keyboard-button']}>
            <img src={keyboard} alt="keyboard-logo" />
            Ввести с клавиатуры
          </button>
        )}
      </footer>
      <Nda />
    </>
  );
};

export default Footer;
