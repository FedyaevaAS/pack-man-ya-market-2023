import './notificationPopup.scss';

const NotificationPopup = ({ children, isOpen, onClick }) => {
  return (
    <div className={`notificationPopup ${isOpen && `notificationPopup_opened`}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default NotificationPopup;
