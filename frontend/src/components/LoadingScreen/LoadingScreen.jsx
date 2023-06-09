import React, { useState, useEffect } from 'react';
import styles from './loadingScreen.module.scss';

const LoadingScreen = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes(minutes + 1);
      setSeconds(0);
    } else {
      setTimeout(setSeconds, 1000, seconds + 1);
    }

    return () => clearTimeout();
  }, [seconds]);

  return (
    <section className={styles.loadingScreen}>
      <div className={styles.loadingScreen__timer}>
        {minutes < 10 ? <span>0{minutes}:</span> : <span>{minutes}:</span>}
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </div>
      <div className={styles.loadingScreen__loader}></div>
      <h1>Ищем новые задания</h1>
      <p>Пока немного отдохните</p>
    </section>
  );
};

export default LoadingScreen;
