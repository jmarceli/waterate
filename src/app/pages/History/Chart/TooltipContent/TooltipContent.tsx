import dayjs from 'dayjs';
import React from 'react';
import { FORMAT_DISPLAY_TIME } from '../../../../../shared/time/time';
import styles from './TooltipContent.module.scss';

type Props = any; // { active: boolean; payload: any; label: string };
export const TooltipContent: React.FC<Props> = ({ active, payload, label }) => {
  const time = dayjs(label).format(FORMAT_DISPLAY_TIME);
  const formattedValue = payload.length ? `water: ${payload[0].value}ml` : '';
  return (
    <div className={styles.root}>
      <p>{time}</p>
      <p>{formattedValue}</p>
    </div>
  );
};
