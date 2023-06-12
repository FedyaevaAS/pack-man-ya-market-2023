import React, { useEffect, useState } from 'react';
import MainButton from '../../components/UI/MainButton/MainButton';
import styles from './ChangeWorkDeskPage.module.scss';
import { Link } from 'react-router-dom';
import NotificationPopup from '../../components/UI/NotificationPopup/NotificationPopup';

const ChangeWorkDeskPage = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  useEffect(() => {
    setIsOpenPopup(true);
    const timer = setTimeout(() => {
      setIsOpenPopup(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <NotificationPopup isOpen={isOpenPopup} onClick={closePopup}>
        <h2>Сигнал принят</h2>
      </NotificationPopup>
      <section className={styles.ChangeWorkDeskPage}>
        <div>
          <h1>Перейдите к столу</h1>
          <h2>S59</h2>
        </div>
        <Link to={'/'}>
          <MainButton text={'Закрыть профиль'} />
        </Link>
      </section>
    </>
  );
};

export default ChangeWorkDeskPage;
