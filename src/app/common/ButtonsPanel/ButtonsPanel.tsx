import React, { ReactNode } from 'react';
import styles from './ButtonsPanel.module.scss';

type Props = {
  children: ReactNode;
};
export const ButtonsPanel: React.FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
