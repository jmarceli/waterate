import React from 'react';
import styles from './Badge.module.scss';
import unknown from './icon-badge-unknown.svg';
import firstSip from './icon-badge-first-sip.svg';
import waterWeek from './icon-badge-water-week.svg';
import waterMonth from './icon-badge-water-month.svg';

type Props = {
  label: string;
  icon: 'unknown' | 'firstSip' | 'waterWeek' | 'waterMonth';
  active?: boolean;
  discovered?: boolean;
  onClick?: () => void;
};

const icons = {
  unknown: unknown,
  firstSip: firstSip,
  waterWeek: waterWeek,
  waterMonth: waterMonth,
};

export const Badge: React.FC<Props> = ({
  label,
  icon,
  onClick,
  discovered = false,
  active = false,
}) => {
  return (
    <div className={styles.root} style={{ opacity: active ? 1 : 0.3 }}>
      <button className={styles.button} onClick={onClick}>
        <img
          className={styles.icon}
          src={icons[discovered ? icon : 'unknown']}
          alt={`badge ${icon}`}
        />
      </button>
      <div className={styles.label}>{discovered ? label : 'Unknown'}</div>
    </div>
  );
};
