import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../components/UI/MainButton/MainButton';
import styles from './SuccessPage.module.scss';
import successLogo from '../../images/success.svg';
import { setOrderStatus } from '../../api/orderApi';
import { useSelector } from 'react-redux';

const SuccessPage = () => {
  let navigate = useNavigate();
  const { orderKey } = useSelector((state) => state.apiSlice);

  const onSubmit = () => {
    setOrderStatus(orderKey, 'ok')
      .then(() => localStorage.clear('orderKey'))
      .then(() => navigate('/'));
  };

  return (
    <section className={styles.successPage}>
      <div>
        <img src={successLogo} alt="success-logo" />
        <h1>
          Упакуйте товары <br></br> и поставьте коробку на конвейер
        </h1>
      </div>

      <MainButton text={'Готово'} onClick={onSubmit} />
    </section>
  );
};

export default SuccessPage;
