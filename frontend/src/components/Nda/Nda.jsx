import React from 'react';
import styles from './Nda.module.scss';

const Nda = ({ forCalculator }) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <section className={`${styles.nda} ${forCalculator ? styles.nda_static : ''}`}>
      <div>
        <p>Коммерческая тайна ООО «Яндекс», 119021, Россия, г. Москва, ул. Льва Толстого, д. 16</p>
        <p>2022.11.1 / 2023.1.68</p>
      </div>
      <p>© 2003–{year} ООО «Яндекс»</p>
    </section>
  );
};

export default Nda;
