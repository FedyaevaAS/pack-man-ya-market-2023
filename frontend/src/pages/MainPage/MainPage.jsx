import React, { useState } from 'react';
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

const MainPage = ({ efficiencyIsOpen }) => {
  const issueButtonNames = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер'];
  const cancelButtonNames = ['Нет товара', 'Несоответствие товара', 'Дефект упаковки'];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isIssueButtonsOpen, setIsIssueButtonsOpen] = useState(false);
  const [isCancelButtonsOpen, setIsCancelButtonsOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

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

  return (
    <>
      <div
        className={`${styles.wrapper} ${
          (isRecommendationsOpen || efficiencyIsOpen) && styles.wrapper_isRecommendationsOpen
        }`}>
        <MainButton text={'Есть проблема'} onClick={() => handleOpenPopups('issue')} />
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.heading__title}>Сканируйте товары</h1>
            <h2 className={styles.heading__order}>B - 63626</h2>
            <ul className={styles.heading__badges} onClick={() => handleOpenPopups('recommend')}>
              {Object.keys(jsonData).map((key) => (
                <PackageButton key={key} boxType={key} packageData={jsonData[key]} />
              ))}
            </ul>
          </div>
          <OrderList onCancelClick={() => handleOpenPopups('cancel')} />
        </div>
        <Link to={'/success'}>
          <MainButton text={'Готово'} />
        </Link>
      </div>
      <Calculator isOpen={isCalculatorOpen} onClose={handleClosePopups} />
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
