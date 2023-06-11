import React, { useEffect, useState } from 'react';
import NotificationPopup from '../UI/NotificationPopup/NotificationPopup';
import styles from './issueButtons.module.scss';

const IssueButtons = ({ buttonNames, isOpen }) => {
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
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`}>
      <section className={styles.issueButtons}>
        <NotificationPopup isOpen={isOpenPopup} onClick={closePopup}>
          <h2>Бригадир скоро подойдет</h2>
          <p>Подождите немного</p>
        </NotificationPopup>
        {buttonNames.map((name, i) => {
          return (
            <button onClick={() => setIsOpenPopup(true)} key={i}>
              {name}
            </button>
          );
        })}
        <button onClick={() => setIsOpenPopup(true)}>Позвать бригадира</button>
      </section>
    </div>
  );
};

export default IssueButtons;
