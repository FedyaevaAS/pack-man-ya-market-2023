import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import danger from '../../images/Danger-ico.svg';
import styles from './Recommendations.module.scss';

const Recommendations = ({ isOpen, onBackClick, changePackage }) => {
  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`}>
      <section className={styles.content}>
        <img src={danger} alt="danger-ico" />
        <h1>Упаковка отличается</h1>
        <h2>Укажите причину замены</h2>
        <div>
          <button onClick={onBackClick}>Нет на складе</button>
          <button onClick={onBackClick}>Неподходящий размер</button>
          <button onClick={onBackClick}>Сканировать повторно</button>
          <Link to={'/success'}>
            <button>Пропустить</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
