import React, { useEffect, useState } from 'react';
import styles from './Calculator.module.scss';
import MainButton from '../UI/MainButton/MainButton';

const Calculator = ({ onCalculatorSubmit, onClose, isOpen }) => {
  const buttonValue = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'x', '0'];

  const [disabledValue, setDisabledValue] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const createSpaces = (inputValue, n) => {
    if (inputValue.length === 4) {
      setInputValue(inputValue + ` ${n}`);
    } else if (inputValue.length === 9) {
      setInputValue(inputValue + ` ${n}`);
    } else if (inputValue.length === 13) {
      setInputValue(inputValue + ` ${n}`);
    }
  };

  const onChangeInput = (n) => {
    if (n === 'x') {
      setInputValue('');
      return;
    } else if (inputValue.length === 16) {
      return;
    }
    setInputValue(inputValue + n);
    createSpaces(inputValue, n);
  };

  const onSubmit = (inputValue) => {
    onCalculatorSubmit(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    inputValue.length === 16 ? setDisabledValue(false) : setDisabledValue(true);
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
        <MainButton onClick={() => onSubmit(inputValue)} text={'Готово'} disabled={disabledValue} />
      </section>
    </div>
  );
};

export default Calculator;
