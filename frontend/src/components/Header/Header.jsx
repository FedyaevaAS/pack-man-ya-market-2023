import './header.scss';
import mainLogo from '../../images/header-logo.svg';
import rocket from '../../images/rocket-logo.svg';

const Header = ({ onClick }) => {
  return (
    <header className="header">
      <div>
        <div className="header__burger">
          <span className="header__burger-class header__burger-class_unclicked"></span>
          <span className="header__burger-class header__burger-class_unclicked"></span>
          <span className="header__burger-class header__burger-class_unclicked"></span>
        </div>
        <img className="header__main-logo" src={mainLogo} alt="main-logo" />
      </div>
      <h1>Упаковка</h1>
      <div>
        <div className="header__efficiency">
          <p className="header__efficiency-id">sof-natgemokee</p>
          <div onClick={onClick}>
            <img src={rocket} alt="main-logo" />
            <p>79%</p>
          </div>
        </div>
        <div className="header__dots">
          <span className="header__dots-class"></span>
          <span className="header__dots-class"></span>
          <span className="header__dots-class"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
