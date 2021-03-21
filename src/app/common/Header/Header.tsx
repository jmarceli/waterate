import React from 'react';
import styles from './Header.module.scss';

type Props = {
  subtitle?: string;
};
export const Header: React.FC<Props> = ({
  subtitle = 'Track your daily water consumption!',
}) => {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>Waterate</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </header>
  );
};
