import React from 'react';
import styles from './MainPage.module.scss';
import jsonData from '../../vendor/styles.json';
import PackageButton from '../../components/UI/PackageButton/PackageButton';
import MainButton from '../../components/UI/MainButton/MainButton';
import OrderList from '../../components/OrderList/OrderList';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <MainButton text={'Есть проблема'} />
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1 className={styles.heading__title}>Сканируйте товары</h1>
          <h2 className={styles.heading__order}>B - 63626</h2>
          <ul className={styles.heading__badges}>
            {Object.keys(jsonData).map((key) => (
              <PackageButton key={key} boxType={key} packageData={jsonData[key]} />
            ))}
          </ul>
        </div>
        <OrderList />
      </div>
      <MainButton text={'Готово'} />
    </div>
  );
};

export default MainPage;