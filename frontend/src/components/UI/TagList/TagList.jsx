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
  if (!Array.isArray(tags)) {
    return null;
  }

  return (
    <div className={styles.tagList}>
      {tags.map((tag, index) => {
        let tagName = tag;
        let tagIcon = tagIcons[tagName];
        let additionalClass = '';

        if (tagName === 'Сканировать QR Честный знак') {
          additionalClass = styles.qrCodeTag;
        } else if (tagName === 'Сканировать IMEI') {
          additionalClass = styles.imeiCodeTag;
        }

        if (
          tagName === 'Пузырчатая плёнка' ||
          tagName === 'Стретч-плёнка' ||
          tagName === 'Пакет' ||
          tagName === 'Упаковать отдельно в NONPACK'
        ) {
          return (
            <div
              key={index}
              className={`${styles.tag} ${
                tagName === 'Упаковать отдельно в NONPACK' ? styles.nonpackTag : ''
              } ${additionalClass}`}>
              <p className={styles.tagName}>{tagName}</p>
            </div>
          );
        } else {
          return (
            <div key={index} className={`${styles.tag} ${styles.defaultTag} ${additionalClass}`}>
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
