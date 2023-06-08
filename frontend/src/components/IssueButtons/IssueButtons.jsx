import { useEffect, useState } from 'react';
import NotificationPopup from '../UI/NotificationPopup/NotificationPopup';
import './issueButtons.scss';

// it will be as a page /issue

const IssueButtons = () => {
  const buttonName = ['Сломан монитор', 'Сломан сканер', 'Сломан принтер', 'Позвать бригадира'];
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const closePopup = () => {
    setIsOpenPopup(false);
  };

  useEffect(() => {
    const timer = () => setTimeout(setIsOpenPopup, 5000, false);

    if (!isOpenPopup) {
      timer();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpenPopup]);

  return (
    <section className="issueButtons">
      <NotificationPopup isOpen={isOpenPopup} onClick={closePopup}>
        <h2>Бригадир скоро подойдет</h2>
        <p>Подождите немного</p>
      </NotificationPopup>
      {buttonName.map((name, i) => {
        return (
          <button onClick={() => setIsOpenPopup(true)} key={i}>
            {name}
          </button>
        );
      })}
    </section>
  );
};

export default IssueButtons;
