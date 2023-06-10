import './footer.scss';
import { useLocation } from 'react-router-dom';
import keyboard from '../../images/keyboard-logo.svg';
import Nda from '../Nda/Nda';

const Footer = ({ openPopup }) => {
  const handleOpen = () => {
    openPopup(true);
  };

  return (
    <>
      <footer className="footer">
        <button className="footer__back-button" onClick={() => openPopup(false)}>
          Назад
        </button>
        <button onClick={handleOpen} className="footer__keyboard-button">
          <img src={keyboard} alt="keyboard-logo" />
          Ввести с клавиатуры
        </button>
      </footer>
      <Nda />
    </>
  );
};

export default Footer;
