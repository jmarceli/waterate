import React from 'react';
import styles from './ButtonBase.module.scss';
import stats from './icon-stats.svg';
import undo from './icon-undo.svg';
import badge from './icon-badge.svg';
import back from './icon-back.svg';

type Props = {
  onClick: () => void;
  label: string;
  icon: 'stats' | 'undo' | 'badge' | 'back';
  hidden?: boolean;
};

const icons = {
  stats: stats,
  undo: undo,
  badge: badge,
  back: back,
};

export const ButtonBase: React.FC<Props> = ({
  onClick,
  label,
  icon,
  hidden = false,
}) => {
  return (
    <div
      className={styles.root}
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    >
      <div className={styles.button} onClick={onClick}>
        <img className={styles.icon} src={icons[icon]} alt="water" />
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};
