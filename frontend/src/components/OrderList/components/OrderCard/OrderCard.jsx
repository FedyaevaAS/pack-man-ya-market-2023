import React, { useState, useRef } from 'react';
import checkMark from '../../../../images/check-mark.svg';
import reversedCheckMark from '../../../../images/reversed-check-mark.svg';
import CounterButton from '../../../UI/CounterButton/CounterButton';
import CancelButton from '../../../UI/CancelButton/CancelButton';
import ExpandButton from '../../../UI/ExpandButton/ExpandButton';
import styles from './OrderCard.module.scss';

const OrderCard = ({
  image,
  text,
  tags,
  counter,
  number,
  onCancelClick,
  isExpanded,
  handleCounterClick,
  onScanSubmit,
  calculatorValue,
  expandedIsOpen
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  // new logic
  const totalCount = useRef(0);
  const [isTotalScanned, setIsTotalScanned] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    totalCount.current = totalCount.current + 1;
    if (totalCount.current === counter) {
      setIsTotalScanned(true);
      onScanSubmit(totalCount.current);
      totalCount.current = 0;
    }
    setSelected(true);
  };

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expandedCard : ''} ${
        expandedIsOpen ? styles.opened : styles.closed
      }`}>
      <div className={`${styles.content} ${selected ? styles.selected : ''}`}>
        {image ? (
          <img className={styles.image} src={image} alt="card-image" />
        ) : (
          <div className={styles.emptyImage}></div>
        )}
        <div className={styles.info}>
          <h3 className={styles.text}>{text}</h3>
          {Array.isArray(tags) ? (
            tags.map((tag, index) => (
              <p key={index} className={styles.tag}>
                {tag}
              </p>
            ))
          ) : (
            <p className={styles.tag}>{tags}</p>
          )}
        </div>
        {counter > 1 ? (
          <>
            <CounterButton disabled={true} counter={counter} scanned={isTotalScanned} />
            <ExpandButton
              onClick={handleExpandClick}
              buttonText="Развернуть"
              buttonLogo={expanded ? reversedCheckMark : checkMark}
            />
          </>
        ) : (
          <>
            <CounterButton
              counter={1}
              onClick={handleCounterClick}
              onScanSubmit={onScanSubmit}
              number={number}
              calculatorValue={calculatorValue}
            />
            <p className={styles.number}>{number}</p>
          </>
        )}
        {counter === 1 && <CancelButton onCancel={onCancelClick} />}
      </div>
      {counter > 1 &&
        Array.from({ length: counter }).map((_, index) => (
          <OrderCard
            key={index}
            text={text}
            tags={tags}
            counter={1}
            number={number}
            onCancelClick={onCancelClick}
            handleCounterClick={handleClick}
            isExpanded={true}
            onScanSubmit={onScanSubmit}
            calculatorValue={calculatorValue}
            expandedIsOpen={expanded}
          />
        ))}
    </div>
  );
};

export default OrderCard;
