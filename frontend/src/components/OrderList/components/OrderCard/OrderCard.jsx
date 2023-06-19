import React, { useState, useRef } from 'react';
import checkMark from '../../../../images/check-mark.svg';
import reversedCheckMark from '../../../../images/reversed-check-mark.svg';
import CounterButton from '../../../UI/CounterButton/CounterButton';
import CancelButton from '../../../UI/CancelButton/CancelButton';
import ExpandButton from '../../../UI/ExpandButton/ExpandButton';
import TagList from '../../../UI/TagList/TagList';

import styles from './OrderCard.module.scss';

const OrderCard = ({
  image,
  text,
  tags,
  counter,
  barcode,
  onCancelClick,
  isExpanded,
  handleCounterClick,
  onScanSubmit,
  calculatorValue,
  expandedIsOpen,
  isCanceled,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

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
          {!isCanceled ? <TagList tags={tags} /> : <div className={styles.emptyTags}></div>}
        </div>
        {counter > 1 ? (
          <>
            <CounterButton
              disabled={true}
              counter={counter}
              scanned={isTotalScanned}
              isCanceled={isCanceled}
            />
            <ExpandButton
              onClick={handleExpandClick}
              buttonText="Развернуть"
              buttonLogo={expanded ? reversedCheckMark : checkMark}
              isCanceled={isCanceled}
            />
          </>
        ) : (
          <>
            <CounterButton
              counter={1}
              onClick={handleCounterClick}
              onScanSubmit={onScanSubmit}
              calculatorValue={calculatorValue}
              barcode={barcode}
              isCanceled={isCanceled}
            />
            <p className={`${isCanceled ? styles.disabled : styles.barcode}`}>{barcode}</p>
          </>
        )}
        {counter === 1 && <CancelButton onCancel={onCancelClick} isCanceled={isCanceled} />}
      </div>
      {counter > 1 &&
        Array.from({ length: counter }).map((_, index) => (
          <OrderCard
            key={index}
            text={text}
            tags={tags}
            counter={1}
            barcode={barcode}
            onCancelClick={onCancelClick}
            handleCounterClick={handleClick}
            isExpanded={true}
            onScanSubmit={onScanSubmit}
            calculatorValue={calculatorValue}
            expandedIsOpen={expanded}
            isCanceled={isCanceled}
          />
        ))}
    </div>
  );
};

export default OrderCard;
