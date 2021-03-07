import React from 'react';
import styles from './Wave.module.scss';
import { ReactComponent as Image } from './Wave.svg';

type Props = {
  height: number;
};

const WaveToMemoize: React.FC<Props> = ({ height }) => {
  return (
    <div className={styles.root}>
      <div className={styles.waveWrapper}>
        <Image className={styles.wave} />
      </div>
      <div className={styles.water} style={{ height: `${height}%` }} />
    </div>
  );
};

export const Wave = React.memo(WaveToMemoize);
