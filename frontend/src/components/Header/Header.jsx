import React from 'react';
import styles from './Header.module.scss';
import mainLogo from '../../images/header-logo.svg';
import rocket from '../../images/rocket-logo.svg';

const Header = ({ onClick }) => {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles['header__burger']}>
          <span
            className={`${styles['header__burger-class']} ${styles['header__burger-class_unclicked']}`}></span>
          <span
            className={`${styles['header__burger-class']} ${styles['header__burger-class_unclicked']}`}></span>
          <span
            className={`${styles['header__burger-class']} ${styles['header__burger-class_unclicked']}`}></span>
        </div>
        <img className={styles['header__main-logo']} src={mainLogo} alt="main-logo" />
      </div>
      <h1>Упаковка</h1>
      <div>
        <div className={styles['header__efficiency']}>
          <p className={styles['header__efficiency-id']}>sof-natgemokee</p>
          <div onClick={onClick} className={styles['header__efficiency-div']}>
            <img src={rocket} alt="main-logo" />
            <p>79%</p>
          </div>
        </div>
        <div className={styles['header__dots']}>
          <span className={`${styles['header__dots-class']}`}></span>
          <span className={`${styles['header__dots-class']}`}></span>
          <span className={`${styles['header__dots-class']}`}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
