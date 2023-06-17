import { useEffect, useRef, useState } from 'react';
import styles from './OrderList.module.scss';
import OrderCard from './components/OrderCard/OrderCard';
import { useSelector } from 'react-redux';

const OrderList = ({ onCancelClick, isAllScanned, calculatorValue }) => {
  const { order } = useSelector((state) => state.apiSlice);

  const totalCount = useRef(0);
  const scanned = useRef(0);

  const onScanSubmit = (scanCount) => {
    scanned.current = scanned.current + scanCount;
    console.log(scanned.current);

    if (scanned.current === totalCount.current) {
      isAllScanned();
    }
  };

  useEffect(() => {
    order.forEach((item) => {
      totalCount.current = totalCount.current + item.counter;
    });
  }, []);

  return (
    <>
      <ul>
        {order?.map((order, i) => (
          <OrderCard
            key={i}
            image={order.image}
            text={order.text}
            tags={order.tag}
            counter={order.counter}
            barcode={order.number}
            onCancelClick={onCancelClick}
            isExpanded={false}
            onScanSubmit={onScanSubmit}
            calculatorValue={calculatorValue}
          />
        ))}
      </ul>
    </>
  );
};

export default OrderList;
