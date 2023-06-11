import { useState } from 'react';
import SecondEfficiency from './SecondView/SecondView';
import styles from './Efficiency.module.scss';

// чтобы убрать двойной скроллбар, делать display: none, у текущего компонента?

const Efficiency = ({ isOpen, onClose }) => {
  const [isOpenSecondView, setIsOpenSecondView] = useState(false);

  const closeSecondEfficiency = () => {
    setIsOpenSecondView(false);
  };

  const closePopups = () => {
    setIsOpenSecondView(false);
    onClose();
  };

  return (
    <div className={`${styles.overlay} ${true && styles.overlay_opened}`}>
      <section className={styles.efficiency}>
        <div className={styles.efficiency__header}>
          <h1>Моя эффективность</h1>
          <button onClick={closePopups}></button>
        </div>
        {!isOpenSecondView ? (
          <div className={styles.efficiency__grid}>
            <div>
              <h2>Текущая смена</h2>
              <h3>
                125<span>%</span>
              </h3>
              <p>5 операций</p>
              <button onClick={() => setIsOpenSecondView(true)}>Детализация смены</button>
            </div>
            <div>
              <h2>Текущая операция</h2>
              <h3>
                79<span>%</span>
              </h3>
              <p>98 единиц</p>
              <div className={styles.efficiency__footer}>
                <p>Упаковка КГТ</p>
                <p>Цель: 100 / час</p>
              </div>
              <p className={styles.efficiency__timer}>01:16</p>
            </div>
          </div>
        ) : (
          <SecondEfficiency isOpen={isOpenSecondView} onClick={closeSecondEfficiency} />
        )}
      </section>
    </div>
  );
};

export default Efficiency;
