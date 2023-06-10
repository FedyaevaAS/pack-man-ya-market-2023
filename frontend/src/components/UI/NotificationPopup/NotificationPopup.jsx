import React from 'react';
import styles from './NotificationPopup.module.scss';

const NotificationPopup = ({ children, isOpen, onClick }) => {
  return (
    <div
      className={`${styles.notificationPopup} ${isOpen && styles.notificationPopup_opened}`}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default NotificationPopup;
