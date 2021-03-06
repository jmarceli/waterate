import React from 'react';
import styles from './Badge.module.scss';
import unknown from './icon-badge-unknown.svg';
import firstSip from './icon-badge-first-sip.svg';
import waterWeek from './icon-badge-water-week.svg';
import waterMonth from './icon-badge-water-month.svg';
import classnames from 'classnames';

type Props = {
  label: string;
  icon: 'unknown' | 'firstSip' | 'waterWeek' | 'waterMonth';
  active?: boolean;
  discovered?: boolean;
  onClick: (details: string) => void;
  details: string;
  fullView?: boolean;
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
  details,
  fullView = false,
}) => {
  const rootCss = classnames(styles.root, { [styles.isFullView]: fullView });
  return (
    <div className={rootCss} style={{ opacity: active ? 1 : 0.3 }}>
      <div className={styles.button} onClick={() => onClick(icon)}>
        <img
          className={styles.icon}
          src={icons[discovered ? icon : 'unknown']}
          alt={`badge ${icon}`}
        />
      </div>
      <div className={styles.label}>{discovered ? label : 'Discover'}</div>
      {fullView && <div className={styles.description}>{details}</div>}
    </div>
  );
};
