import React, { useState } from 'react';
import checkMark from '../../../../images/check-mark.svg';
import CounterButton from '../../../UI/CounterButton/CounterButton';
import CancelButton from '../../../UI/CancelButton/CancelButton';
import ExpandButton from '../../../UI/ExpandButton/ExpandButton';
import styles from './OrderCard.module.scss';

const OrderCard = ({ image, text, tags, counter, number, onCancelClick, isExpanded }) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCounterClick = () => {
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
            <CounterButton counter={counter} onClick={handleCounterClick} />
            <ExpandButton
              onClick={handleExpandClick}
              buttonText="Развернуть"
              buttonLogo={checkMark}
            />
          </>
        ) : (
          <>
            <CounterButton counter={1} onClick={handleCounterClick} />
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
            isExpanded={true}
          />
        ))}
    </div>
  );
};

export default OrderCard;
