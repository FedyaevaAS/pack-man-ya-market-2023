import React, { useState } from 'react';
import styles from './MainPage.module.scss';
import jsonData from '../../vendor/styles.json';
import PackageButton from '../../components/UI/PackageButton/PackageButton';
import MainButton from '../../components/UI/MainButton/MainButton';
import OrderList from '../../components/OrderList/OrderList';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import Calculator from '../../components/Calculator/Calculator';
import IssueButtons from '../../components/IssueButtons/IssueButtons';

const MainPage = () => {
  const issueButtonNames = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер'];
  const cancelButtonNames = ['Нет товара', 'Несоответствие товара', 'Дефект упаковки'];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isIssueButtonsOpen, setIsIssueButtonsOpen] = useState(false);
  const [isCancelButtonsOpen, setIsCancelButtonsOpen] = useState(false);

  const handleOpenPopups = (popupName) => {
    if (popupName === 'issue') {
      setIsIssueButtonsOpen(true);
    } else if (popupName === 'cancel') {
      setIsCancelButtonsOpen(true);
    } else {
      setIsCalculatorOpen(true);
    }
    setIsPopupOpen(true);
  };

  const handleClosePopups = () => {
    setIsIssueButtonsOpen(false);
    setIsCalculatorOpen(false);
    setIsCancelButtonsOpen(false);
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <MainButton text={'Есть проблема'} onClick={() => handleOpenPopups('issue')} />
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
          <OrderList onCancelClick={() => handleOpenPopups('cancel')} />
        </div>
        <MainButton text={'Готово'} />
      </div>
      <Calculator isOpen={isCalculatorOpen} onClose={handleClosePopups} />
      <IssueButtons isOpen={isIssueButtonsOpen} buttonNames={issueButtonNames} />
      <IssueButtons isOpen={isCancelButtonsOpen} buttonNames={cancelButtonNames} />
      <ControlPanel
        onClose={handleClosePopups}
        openPopup={() => handleOpenPopups('calculator')}
        withOutBackButton={isPopupOpen}
        withOutKeyboardButton={isPopupOpen}
      />
    </>
  );
};

export default MainPage;
