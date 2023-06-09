import React from 'react';
import styles from './Footer.module.scss';

const Footer = ({ forCalculator }) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={`${styles.footer} ${forCalculator ? styles.footer_static : ''}`}>
      <div>
        <p>Коммерческая тайна ООО «Яндекс», 119021, Россия, г. Москва, ул. Льва Толстого, д. 16</p>
        <p>2022.11.1 / 2023.1.68</p>
      </div>
      <p>© 2003–{year} ООО «Яндекс»</p>
    </footer>
  );
};

export default Footer;
