import React, { useEffect, useState } from 'react';
import NotificationPopup from '../UI/NotificationPopup/NotificationPopup';
import styles from './issueButtons.module.scss';
import { Link } from 'react-router-dom';

const IssueButtons = ({ buttonNames, isOpen, toRedirect, isCanceled }) => {
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
        {toRedirect
          ? buttonNames.map((name, i) => {
              return (
                <Link to={'/new-work-desk'} key={i}>
                  <button>{name}</button>
                </Link>
              );
            })
          : buttonNames.map((name, i) => {
              return (
                <button onClick={() => isCanceled(true)} key={i}>
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
