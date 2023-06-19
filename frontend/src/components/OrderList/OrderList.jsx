import { useEffect, useRef, useState } from 'react';
import styles from './OrderList.module.scss';
import OrderCard from './components/OrderCard/OrderCard';
import { useSelector } from 'react-redux';

const OrderList = ({ onCancelClick, isAllScanned, calculatorValue, isCanceled }) => {
  const { order } = useSelector((state) => state.apiSlice);

  const totalCount = useRef(0);
  const scanned = useRef(0);

  const onScanSubmit = (scanCount) => {
    scanned.current = scanned.current + scanCount;

    if (scanned.current === totalCount.current) {
      isAllScanned();
    }
  };

  useEffect(() => {
    totalCount.current = order.count;
  }, [order.count]);

  return (
    <>
      <ul>
        {order.items?.map((order, i) => (
          <OrderCard
            key={i}
            image={order.image_url}
            text={order.name}
            tags={order.tags}
            counter={order.count}
            barcode={order.barcode}
            onCancelClick={onCancelClick}
            isExpanded={false}
            onScanSubmit={onScanSubmit}
            calculatorValue={calculatorValue}
            isCanceled={isCanceled}
          />
        ))}
      </ul>
    </>
  );
};

export default OrderList;
