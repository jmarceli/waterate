import React from 'react';
import styles from './History.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';
import { Chart } from './Chart/Chart';

export const History: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      History
      <div className={styles.chart}>
        <Chart
          data={[
            { time: '2021-01-26 08:00', water: 0 },
            { time: '2021-01-26 09:00', water: 0.2 },
            { time: '2021-01-26 09:00', water: 0.5 },
            { time: '2021-01-26 09:00', water: 0.6 },
            { time: '2021-01-26 10:00', water: 0.8 },
            { time: '2021-01-26 15:00', water: 0.9 },
          ]}
        />
      </div>
      <ButtonBase
        icon="back"
        onClick={() => history.push('/')}
        label="return"
      />
    </div>
  );
};
