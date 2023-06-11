import React from 'react';
import styles from './ControlPanel.module.scss';
import keyboard from '../../images/keyboard-logo.svg';

const ControlPanel = ({ withOutBackButton, withOutKeyboardButton, openPopup }) => {
  const handleOpen = () => {
    openPopup(true);
  };

  return (
    <>
      <section className={styles.сontrolPanel}>
        {withOutBackButton && (
          <button className={styles['сontrolPanel__back-button']} onClick={() => openPopup(false)}>
            Назад
          </button>
        )}
        {!withOutKeyboardButton && (
          <button onClick={handleOpen} className={styles['сontrolPanel__keyboard-button']}>
            <img src={keyboard} alt="keyboard-logo" />
            Ввести с клавиатуры
          </button>
        )}
      </section>
    </>
  );
};

export default ControlPanel;
