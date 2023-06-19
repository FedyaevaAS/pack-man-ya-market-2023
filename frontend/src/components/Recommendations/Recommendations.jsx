import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import danger from '../../images/Danger-ico.svg';
import styles from './Recommendations.module.scss';
import { useSelector } from 'react-redux';

import NotificationPopup from '../UI/NotificationPopup/NotificationPopup';

const Recommendations = ({ isOpen, onBackClick, changePackage, packageRecommendationCount }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const totalPackages = useRef(0);
  const { order } = useSelector((state) => state.apiSlice);

  const onChangePackage = () => {
    if (totalPackages.current === 1) {
      setIsOpenPopup(true);
      console.log('openPopup');
    } else if (
      totalPackages.current < packageRecommendationCount &&
      totalPackages.current !== packageRecommendationCount
    ) {
      changePackage('plus');
    } else {
      changePackage('minus');
    }
  };

  useEffect(() => {
    totalPackages.current = 0;

    if (order.packages) {
      order.packages.forEach(() => {
        totalPackages.current = totalPackages.current + 1;
      });
    }
  }, [order]);

  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`}>
      <NotificationPopup isOpen={isOpenPopup} onClick={() => setIsOpenPopup(false)}>
        <h2>Нет других подходящих вариантов</h2>
        <p>Нажмите кнопку пропустить</p>
      </NotificationPopup>
      <section className={styles.content}>
        <img src={danger} alt="danger-ico" />
        <h1>Упаковка отличается</h1>
        <h2>Укажите причину замены</h2>
        <div>
          <button onClick={onChangePackage}>Нет на складе</button>
          <button onClick={onChangePackage}>Неподходящий размер</button>
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
