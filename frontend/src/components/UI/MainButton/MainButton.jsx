import './MainButton.scss';

const MainButton = ({ text, disabled, onClick }) => {
  return (
    <div className="mainButton">
      <button
        className={`${text === 'Есть проблема' ? 'mainButton__problem' : 'mainButton__ready'}`}
        disabled={disabled}
        onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
