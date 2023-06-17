import React from 'react';
import { Link } from 'react-router-dom';
import MainButton from '../../components/UI/MainButton/MainButton';
import styles from './SuccessPage.module.scss';
import successLogo from '../../images/success.svg';

const SuccessPage = () => {
  return (
    <section className={styles.successPage}>
      <div>
        <img src={successLogo} alt="success-logo" />
        <h1>
          Упакуйте товары <br></br> и поставьте коробку на конвейер
        </h1>
      </div>
      <Link to={'/'}>
        <MainButton text={'Готово'} />
      </Link>
    </section>
  );
};

export default SuccessPage;
