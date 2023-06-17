import React from 'react';
import cancelIco from '../../../images/cancel-ico.svg';
import styles from './MainHeadingBadge.module.scss';

const MainHeadingBadge = ({ text }) => {
  return (
    <div className={`${styles.content} ${text === 'Заказ отменён' && styles.content_cancel}`}>
      {text === 'Заказ отменён' && <img src={cancelIco} alt="cancel-ico" />}
      <p>{text}</p>
    </div>
  );
};

export default MainHeadingBadge;
