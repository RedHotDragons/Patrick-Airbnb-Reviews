/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../dist/reviews.module.css';

const ReviewsModal = ({ show, toggle, children }) => (
    <div className={styles.modalWrapper} style={{ display: show? 'block' : 'none' }}>
      <div className={styles.modalOverlay} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.modalCloseButton} onClick={toggle}>&times;</span>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
);

export default ReviewsModal;