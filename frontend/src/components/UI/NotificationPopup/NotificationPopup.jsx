import React from 'react';
import styles from './NotificationPopup.module.scss';

const NotificationPopup = ({ children, isOpen, onClick }) => {
  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`} onClick={onClick}>
      <div className={`${styles.notificationPopup} ${isOpen && styles.notificationPopup_opened}`}>
        {children}
      </div>
    </div>
  );
};

export default NotificationPopup;
