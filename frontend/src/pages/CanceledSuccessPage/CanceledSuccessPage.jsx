import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CanceledSuccessPage.module.scss';
import successLogo from '../../images/canceled-success.svg';
import { setOrderStatus } from '../../api/orderApi';
import { useSelector } from 'react-redux';

const CanceledSuccessPage = () => {
  let navigate = useNavigate();
  const { orderKey } = useSelector((state) => state.apiSlice);

  useEffect(() => {
    const routeByTime = setTimeout(
      setOrderStatus(orderKey, 'canceled')
        .then(() => {
          localStorage.clear('orderKey');
        })
        .then(() => navigate('/')),
      5000
    );

    return () => clearTimeout(routeByTime);
  }, []);

  return (
    <section className={styles.CanceledSuccessPage}>
      <div>
        <img src={successLogo} alt="success-logo" />
        <h1>
          Положите товар в тару <br></br> и сканируйте её штрихкод
        </h1>
      </div>
    </section>
  );
};

export default CanceledSuccessPage;
