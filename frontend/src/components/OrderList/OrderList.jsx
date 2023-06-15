import { useEffect, useRef, useState } from 'react';
import styles from './OrderList.module.scss';
import OrderCard from './components/OrderCard/OrderCard';

const orders = [
  {
    image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
    text: 'Умная колонка Яндекс Станция Лайт, ультрафиолет',
    tag: 'Пузырчатая плёнка',
    counter: 3,
    number: '1234 5678 234 32'
  },
  {
    image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
    text: 'Тарелка. Императорский фарфоровый завод. Форма "Стандартная - 2", рисунок "Скарлетт 2". Костяной фарфор . 270 мм.',
    tag: [['хрупкое'], ['Пузырчатая плёнка']],
    counter: 2,
    number: '1234 5678 234 33'
  },
  {
    image: 'https://avatars.mds.yandex.net/get-mpic/1361544/img_id3625151140723044197.jpeg/orig',
    text: 'Набор для рисования, детский художественный набор в чемоданчике, набор юного художника, 48 предметов и раскраска',
    tag: ['Пузырчатая плёнка'],
    counter: 1,
    number: '1234 5678 234 34'
  }
];

const OrderList = ({ order, onCancelClick, isAllScanned, calculatorValue }) => {
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
    orders.forEach((order) => {
      totalCount.current = totalCount.current + order.counter;
    });
  }, []);

  return (
    <>
      <ul>
        {orders?.map((order, i) => (
          <OrderCard
            key={i}
            image={order.image}
            text={order.text}
            tags={order.tag}
            counter={order.counter}
            number={order.number}
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
