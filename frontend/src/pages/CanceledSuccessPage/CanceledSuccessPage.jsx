import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CanceledSuccessPage.module.scss';
import successLogo from '../../images/canceled-success.svg';

const CanceledSuccessPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const routeByTime = setTimeout(() => navigate('/'), 5000);

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
