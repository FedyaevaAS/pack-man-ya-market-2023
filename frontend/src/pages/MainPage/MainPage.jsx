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
import { Link } from 'react-router-dom';
import MainHeadingBadge from '../../components/UI/MainHeadingBadge/MainHeadingBadge';

const MainPage = ({ efficiencyIsOpen }) => {
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

  return (
    <>
      <div className={`${styles.wrapper} `}>
        <MainButton text={'Есть проблема'} onClick={() => handleOpenPopups('issue')} />
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.heading__title}>Сканируйте товары</h1>
            <h2 className={styles.heading__order}>B-63626</h2>
            <ul className={styles.heading__badges}>
              <MainHeadingBadge text={'Заказ отменён'} />
              <MainHeadingBadge text={'4 товара'} />
              <MainHeadingBadge text={'Почта России'} />
              {Object.keys(jsonData).map((key) => (
                <PackageButton
                  key={key}
                  boxType={key}
                  packageData={jsonData[key]}
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
