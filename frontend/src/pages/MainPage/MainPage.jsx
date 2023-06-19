import React, { useState, useRef, useEffect } from 'react';
import styles from './MainPage.module.scss';
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
import { setOrderStatus } from '../../api/orderApi';

const MainPage = ({ efficiencyIsOpen }) => {
  let navigate = useNavigate();
  const issueButtonNames = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер'];
  const cancelButtonNames = ['Нет товара', 'Несоответствие товара', 'Дефект упаковки'];
  const totalCountText = ['товар', 'товара', 'товаров'];

  const totalPackageCount = useRef(0);
  const scannedPackages = useRef(0);
  const packageRecommendationCount = useRef(0);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isIssueButtonsOpen, setIsIssueButtonsOpen] = useState(false);
  const [isCancelButtonsOpen, setIsCancelButtonsOpen] = useState(false);

  const [isCanceled, setIsCanceled] = useState(false);

  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [isOrderScanned, setIsOrderScanned] = useState(false);
  const [isPackageScanned, setIsPackageScanned] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('');

  const { status, order, errorMessage, orderKey } = useSelector((state) => state.apiSlice);

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

  const changePackageRecommendation = (plus) => {
    plus === 'plus'
      ? (packageRecommendationCount.current = packageRecommendationCount.current + 1)
      : (packageRecommendationCount.current = packageRecommendationCount.current - 1);
    handleClosePopups();
  };

  const onCancelSubmit = (value) => {
    setIsCanceled(value);
    handleClosePopups();
  };

  const onFail = () => {
    setOrderStatus(orderKey, 'cancel')
      .then(() => localStorage.clear('orderKey'))
      .then(() => navigate('/'));
  };

  useEffect(() => {
    if (order.packages) {
      totalPackageCount.current = Object.keys(Object.assign({}, ...order.packages)).length;
      order.status === 'fail' && setIsCanceled(true);
      console.log(order.status);
    }
  }, [order.packages]);

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
                  <MainHeadingBadge
                    text={`${order.count} ${
                      order.count === 1
                        ? totalCountText[0]
                        : order.count >= 5 && order.count <= 20
                        ? totalCountText[1]
                        : totalCountText[2]
                    }`}
                  />
                  <MainHeadingBadge text={order.delivery_type} />
                  {!isCanceled &&
                    Object.keys(order.packages[packageRecommendationCount.current]).map((key) => (
                      <PackageButton key={key} boxType={key} setAllScanned={setAllPackageScanned} />
                    ))}
                </ul>
              </div>
              <div className={`${isCanceled ? styles.disabled : ''}`}>
                <OrderList
                  onCancelClick={() => handleOpenPopups('cancel')}
                  isAllScanned={setAllItemsScanned}
                  calculatorValue={calculatorValue}
                  isCanceled={isCanceled}
                />
              </div>
              {(isCanceled || (isOrderScanned && isPackageScanned)) && (
                <Link
                  to={
                    order.status === 'fail'
                      ? '/main'
                      : isCanceled
                      ? '/canceled-success'
                      : isOrderScanned && isPackageScanned
                      ? '/success'
                      : '/main'
                  }>
                  <MainButton
                    text={'Готово'}
                    onClick={
                      order.status === 'fail' ? () => onFail() : () => handleOpenPopups('recommend')
                    }
                  />
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      <Calculator
        isOpen={isCalculatorOpen}
        onClose={handleClosePopups}
        onCalculatorSubmit={onCalculatorSubmit}
      />
      <IssueButtons isOpen={isIssueButtonsOpen} buttonNames={issueButtonNames} toRedirect={true} />
      <IssueButtons
        isOpen={isCancelButtonsOpen}
        buttonNames={cancelButtonNames}
        isCanceled={onCancelSubmit}
      />
      <Recommendations
        isOpen={isRecommendationsOpen}
        onBackClick={handleClosePopups}
        changePackage={changePackageRecommendation}
        packageRecommendationCount={packageRecommendationCount.current}
      />
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
