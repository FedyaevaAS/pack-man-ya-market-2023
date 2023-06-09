import styles from './OrderCard.module.scss';

const OrderCard = ({ image, text, tag, counter, number }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="card-image" />
      <div>
        <h3 className={styles.text}>{text}</h3>
        <p className={styles.tag}>{tag}</p>
      </div>
      <p className={styles.counter}>{counter}</p>
      <p className={styles.number}>{number}</p>
    </div>
  );
};

export default OrderCard;
