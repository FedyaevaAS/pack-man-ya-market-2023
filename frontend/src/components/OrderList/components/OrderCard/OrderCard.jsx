import styles from './OrderCard.module.scss';
import CancelButton from '../../../UI/CancelButton/CancelButton';

const OrderCard = ({ image, text, tags, counter, number, onCancelClick }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="card-image" />
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
      <p className={styles.counter}>{counter}</p>
      <p className={styles.number}>{number}</p>
      <CancelButton onCancel={onCancelClick} />
    </div>
  );
};

export default OrderCard;
