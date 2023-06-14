import React from 'react';
import fragileIcon from '../../../images/fragile-icon.svg';
import toxicIcon from '../../../images/toxic-icon.svg';
import packageIcon from '../../../images/package-icon.svg';
import imeiCodeIcon from '../../../images/imei-code-icon.svg';
import qrCodeIcon from '../../../images/qr-code-icon.svg';

import styles from './TagList.module.scss';

const tagIcons = {
  Хрупкое: fragileIcon,
  Токсичное: toxicIcon,
  Крупногабаритное: packageIcon,
  'Сканировать QR Честный знак': qrCodeIcon,
  'Сканировать IMEI': imeiCodeIcon,
};

const TagList = ({ tags }) => {
  return (
    <div className={styles.tagList}>
      {tags.map((tag, index) => {
        if (typeof tag === 'string') {
          if (tag === 'Пузырчатая плёнка' || tag === 'Стретч-плёнка' || tag === 'Пакет') {
            return (
              <div
                key={index}
                className={`${styles.tag} ${
                  tag === 'Упаковать отдельно в NONPACK' ? styles.nonpackTag : ''
                }`}>
                <p className={styles.tagName}>{tag}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className={`${styles.tag} ${styles.defaultTag}`}>
                <p className={styles.tagName}>{tag}</p>
              </div>
            );
          }
        } else {
          const tagName = tag[0];
          const tagIcon = tagIcons[tagName];

          return (
            <div
              key={index}
              className={`${styles.tag} ${
                tagName === 'Сканировать QR Честный знак' ? styles.qrCodeTag : ''
              } ${tagName === 'Сканировать IMEI' ? styles.imeiCodeTag : ''}`}>
              {tagIcon && (
                <div className={styles.tagIconContainer}>
                  <img src={tagIcon} alt={tagName} className={styles.tagIcon} />
                </div>
              )}
              <p className={styles.tagName}>{tagName}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TagList;
