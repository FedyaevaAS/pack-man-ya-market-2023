import React from 'react';
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
      <MainButton text={'Готово'} />
    </section>
  );
};

export default SuccessPage;
