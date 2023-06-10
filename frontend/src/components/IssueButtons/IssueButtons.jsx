import React, { useEffect, useState } from 'react';
import NotificationPopup from '../UI/NotificationPopup/NotificationPopup';
import styles from './issueButtons.module.scss';

const IssueButtons = () => {
  const buttonName = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер', 'Позвать бригадира'];
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpenPopup(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpenPopup]);

  return (
    <section className={styles.issueButtons}>
      <NotificationPopup isOpen={isOpenPopup} onClick={closePopup}>
        <h2>Бригадир скоро подойдет</h2>
        <p>Подождите немного</p>
      </NotificationPopup>
      {buttonName.map((name, i) => {
        return (
          <button onClick={() => setIsOpenPopup(true)} key={i}>
            {name}
          </button>
        );
      })}
    </section>
  );
};

export default IssueButtons;
