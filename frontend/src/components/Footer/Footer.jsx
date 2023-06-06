import './footer.scss';
import keyboard from '../../images/keyboard-logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <button className="footer__back-button">Назад</button>
      <button className="footer__keyboard-button">
        <img src={keyboard} alt="keyboard-logo" />
        Ввести с клавиатуры
      </button>
    </footer>
  );
};

export default Footer;
