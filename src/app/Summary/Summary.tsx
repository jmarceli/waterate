import React from 'react';
import styles from './Summary.module.scss';

type Props = {
  total: number;
  percent: number;
};

export const Summary: React.FC<Props> = ({ total, percent }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Your total water today</h2>
      <div className={styles.percent}>{percent}%</div>
      <div className={styles.subtitle}>
        out of the recommended 2 liters per day
      </div>
    </div>
  );
};
