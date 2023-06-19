import React from 'react';
import styles from './NotificationPopup.module.scss';

const NotificationPopup = ({ children, isOpen, onClick, error }) => {
  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`} onClick={onClick}>
      <div
        className={`${styles.notificationPopup} ${isOpen && styles.notificationPopup_opened} ${
          error && styles.notificationPopup_error
        }`}>
        {children}
      </div>
    </div>
  );
};

export default NotificationPopup;
