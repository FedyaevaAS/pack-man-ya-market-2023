import React, { useState, useRef } from 'react';
import checkMark from '../../../../images/check-mark.svg';
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
  number,
  onCancelClick,
  isExpanded,
  handleCounterClick,
  onScanSubmit,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const [totalCount, setTotalCount] = useState(1);
  const [isTotalScanned, setIsTotalScanned] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setTotalCount(totalCount + 1);
    if (totalCount === counter) {
      setIsTotalScanned(true);
      onScanSubmit(totalCount);
    }
    setSelected(!selected);
  };

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expandedCard : ''}`}>
      <div className={`${styles.content} ${selected ? styles.selected : ''}`}>
        {image ? (
          <img className={styles.image} src={image} alt="card-image" />
        ) : (
          <div className={styles.emptyImage}></div>
        )}
        <div className={styles.info}>
          <h3 className={styles.text}>{text}</h3>
          <TagList tags={tags} />
        </div>
        {counter > 1 ? (
          <>
            <CounterButton disabled={true} counter={counter} scanned={isTotalScanned} />
            <ExpandButton
              onClick={handleExpandClick}
              buttonText="Развернуть"
              buttonLogo={checkMark}
            />
          </>
        ) : (
          <>
            <CounterButton counter={1} onClick={handleCounterClick} onScanSubmit={onScanSubmit} />
            <p className={styles.number}>{number}</p>
          </>
        )}
        {counter === 1 && <CancelButton onCancel={onCancelClick} />}
      </div>
      {expanded &&
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
          />
        ))}
    </div>
  );
};

export default OrderCard;
