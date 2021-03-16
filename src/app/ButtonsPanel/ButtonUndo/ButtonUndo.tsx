import React from 'react';
import styles from './ButtonUndo.module.scss';
import src from './icon-undo.svg';

type Props = {
  total: number;
  undoHandler: () => void;
};

export const ButtonUndo: React.FC<Props> = ({ total, undoHandler }) => {
  return (
    <button
      className={styles.root}
      style={{
        visibility: total > 0 ? 'visible' : 'hidden',
      }}
      onClick={() => undoHandler()}
    >
      <img src={src} alt="undo" className={styles.icon} />
      <span className={styles.label}>undo last change</span>
    </button>
  );
};
