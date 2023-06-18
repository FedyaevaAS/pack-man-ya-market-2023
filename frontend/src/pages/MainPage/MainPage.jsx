import React, { useState, useRef, useEffect } from 'react';
import styles from './MainPage.module.scss';
import jsonData from '../../vendor/styles.json';
import PackageButton from '../../components/UI/PackageButton/PackageButton';
import MainButton from '../../components/UI/MainButton/MainButton';
import OrderList from '../../components/OrderList/OrderList';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import Calculator from '../../components/Calculator/Calculator';
import IssueButtons from '../../components/IssueButtons/IssueButtons';
import Recommendations from '../../components/Recommendations/Recommendations';
import { Link, useNavigate } from 'react-router-dom';
import MainHeadingBadge from '../../components/UI/MainHeadingBadge/MainHeadingBadge';
import { useSelector } from 'react-redux';
import NotificationPopup from '../../components/UI/NotificationPopup/NotificationPopup';

const MainPage = ({ efficiencyIsOpen }) => {
  let navigate = useNavigate();
  const issueButtonNames = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер'];
  const cancelButtonNames = ['Нет товара', 'Несоответствие товара', 'Дефект упаковки'];

  const totalPackageCount = useRef(0);
  const scannedPackages = useRef(0);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isIssueButtonsOpen, setIsIssueButtonsOpen] = useState(false);
  const [isCancelButtonsOpen, setIsCancelButtonsOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [isOrderScanned, setIsOrderScanned] = useState(false);
  const [isPackageScanned, setIsPackageScanned] = useState(false);

  const [calculatorValue, setCalculatorValue] = useState('');

  const { status, order, errorMessage } = useSelector((state) => state.apiSlice);

  isPopupOpen || efficiencyIsOpen
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'scroll');

  const handleOpenPopups = (popupName) => {
    if (popupName === 'issue') {
      setIsIssueButtonsOpen(true);
    } else if (popupName === 'cancel') {
      setIsCancelButtonsOpen(true);
    } else if (popupName === 'recommend') {
      setIsRecommendationsOpen(true);
    } else {
      setIsCalculatorOpen(true);
    }
    setIsPopupOpen(true);
  };

  const handleClosePopups = () => {
    setIsIssueButtonsOpen(false);
    setIsCalculatorOpen(false);
    setIsCancelButtonsOpen(false);
    setIsRecommendationsOpen(false);
    setIsPopupOpen(false);
  };

  const setAllItemsScanned = () => {
    setIsOrderScanned(true);
  };

  const setAllPackageScanned = (scanCount) => {
    scannedPackages.current = scannedPackages.current + scanCount;

    if (scannedPackages.current === totalPackageCount.current) {
      setIsPackageScanned(true);
    }
  };

  const onCalculatorSubmit = (value) => {
    setCalculatorValue(value);
    handleClosePopups();
  };

  useEffect(() => {
    totalPackageCount.current = Object.keys(jsonData).length;
  }, []);

  /*   const keys = Object.keys(Object.assign({}, ...order.packages));

  console.log(keys); */

  /* Object.keys(order.packages).map((key) => console.log(key[0] + ' is ' + order.packages[key[0]])); */

  return (
    <>
      <div className={`${styles.wrapper} `}>
        <NotificationPopup isOpen={status === 'error'} onClick={() => navigate('/')} error={status}>
          <h2>Что-то пошло не так</h2>
          <p>{errorMessage}</p>
        </NotificationPopup>
        {status === 'success' && (
          <>
            <MainButton text={'Есть проблема'} onClick={() => handleOpenPopups('issue')} />
            <div className={styles.content}>
              <div className={styles.heading}>
                <h1 className={styles.heading__title}>Сканируйте товары</h1>
                <h2 className={styles.heading__order}>В-{order.order_number}</h2>
                <ul className={styles.heading__badges}>
                  {order.status === 'fail' && <MainHeadingBadge text={'Заказ отменён'} />}
                  <MainHeadingBadge text={`${order.count} товара`} />
                  <MainHeadingBadge text={order.delivery_type} />
                  {Object.keys(Object.assign({}, ...order.packages)).map((key) => (
                    <PackageButton
                      key={key}
                      boxType={key}
                      packageData={key}
                      setAllScanned={setAllPackageScanned}
                    />
                  ))}
                </ul>
              </div>
              <OrderList
                onCancelClick={() => handleOpenPopups('cancel')}
                isAllScanned={setAllItemsScanned}
                calculatorValue={calculatorValue}
              />
            </div>
            {isOrderScanned && (
              <Link to={isOrderScanned && isPackageScanned ? '/success' : '/main'}>
                <MainButton text={'Готово'} onClick={() => handleOpenPopups('recommend')} />
              </Link>
            )}
          </>
        )}
      </div>

      <Calculator
        isOpen={isCalculatorOpen}
        onClose={handleClosePopups}
        onCalculatorSubmit={onCalculatorSubmit}
      />
      <IssueButtons isOpen={isIssueButtonsOpen} buttonNames={issueButtonNames} toRedirect={true} />
      <IssueButtons isOpen={isCancelButtonsOpen} buttonNames={cancelButtonNames} />
      <Recommendations isOpen={isRecommendationsOpen} onBackClick={handleClosePopups} />
      {!isRecommendationsOpen && (
        <ControlPanel
          onClose={handleClosePopups}
          openPopup={() => handleOpenPopups('calculator')}
          withOutBackButton={isPopupOpen}
          withOutKeyboardButton={isPopupOpen}
        />
      )}
    </>
  );
};

export default MainPage;
