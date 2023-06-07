import React, { useEffect, useState } from 'react';

import './calculator.scss';
import MainButton from '../UI/MainButton/MainButton';
import Nda from '../Nda/Nda';

const Calculator = ({ onCalculatorSubmit, isOpen, openPopup }) => {
  const buttonValue = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'x', '0'];

  const [disabledValue, setDisabledValue] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (n) => {
    if (n === 'x') {
      setInputValue(inputValue.slice(0, -1));
      return;
    } else if (inputValue.length === 13) {
      return;
    }
    setInputValue(inputValue + n);
  };

  const onSubmit = () => {
    onCalculatorSubmit(inputValue);
  };

  useEffect(() => {
    inputValue.length === 13 ? setDisabledValue(false) : setDisabledValue(true);
  }, [inputValue]);

  return (
    <div className={`overlay overlay_opened  ${isOpen ? 'overlay_opened' : null}`}>
      <section className="calculator">
        <div className="calculator__flex">
          <h2>Введите штрихкод товара</h2>
          <input
            className={`${disabledValue === true ? 'disabled' : null}`}
            value={inputValue}
            readOnly></input>
          <div>
            {buttonValue.map((n, i) => {
              return (
                <button key={i} onClick={() => onChangeInput(n)}>
                  {n}
                </button>
              );
            })}
          </div>
        </div>
        <MainButton onClick={onSubmit} text={'Готово'} disabled={disabledValue} />
      </section>
    </div>
  );
};

export default Calculator;
