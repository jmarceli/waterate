import React from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>Waterate</h1>
      <h2 className={styles.subtitle}>Track your daily water consumption!</h2>
    </header>
  );
};
