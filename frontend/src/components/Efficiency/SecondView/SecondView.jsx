import './secondView.scss';

const SecondView = ({ onClick, isOpen }) => {
  return (
    <div className={`secondView ${isOpen && 'secondView_opened'}`}>
      <div className="secondView__grid">
        <div>
          <h2>Учёт рекомендаций</h2>
          <h3>
            79<span>%</span>
          </h3>
          <p>+15% за последний час</p>
        </div>
        <div>
          <h2>Скорость упаковки</h2>
          <h3>
            83<span>%</span>
          </h3>
          <p>+9% за последний час</p>
        </div>
      </div>
      <div className="secondView__footer">
        <button onClick={onClick}>Назад</button>
      </div>
    </div>
  );
};

export default SecondView;
