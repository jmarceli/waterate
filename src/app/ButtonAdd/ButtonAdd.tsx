import React from 'react';
import styles from './ButtonAdd.module.scss';

export const ButtonAdd: React.FC<{ onClick: () => void; children: any }> = ({
  onClick,
  children,
}) => {
  return (
    <div className={styles.root}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
};
