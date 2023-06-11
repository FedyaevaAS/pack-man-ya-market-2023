import React, { useEffect, useState } from 'react';
import styles from './Calculator.module.scss';
import MainButton from '../UI/MainButton/MainButton';

const Calculator = ({ onCalculatorSubmit, onClose, isOpen }) => {
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
    <div className={`${styles.overlay} ${isOpen && styles.overlay_opened}`}>
      <section className={styles.calculator}>
        <div className={styles.calculator__flex}>
          <h2>Введите штрихкод товара</h2>
          <input
            className={`${disabledValue === true ? styles.disabled : ''}`}
            value={inputValue}
            readOnly
          />
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
        <MainButton onClick={onSubmit && onClose} text={'Готово'} disabled={disabledValue} />
      </section>
    </div>
  );
};

export default Calculator;
