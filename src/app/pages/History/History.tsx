import React, { useEffect } from 'react';
import styles from './History.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';
import { Chart } from './Chart/Chart';
import { useAsyncFn } from 'react-use';
import { getGroupedData } from '../../../shared/db/getGroupedData';
import dayjs, { Dayjs } from 'dayjs';
import { range } from 'lodash';

const lastWeekRange = (date: Dayjs) => {
  return range(7)
    .reverse()
    .map((value) => {
      return date.subtract(value, 'day').format('YYYY-MM-DD');
    });
};

export const History: React.FC = () => {
  const history = useHistory();
  const now = dayjs();
  const [{ value }, fetch] = useAsyncFn(async () => {
    const result: any = await getGroupedData(now.subtract(7, 'day'), now);

    // console.log('chart', result);
    const chartData = lastWeekRange(now).map((value) => ({
      x: value,
      y: result[value] || 0,
    }));
    // console.log('chartData', chartData);
    return chartData;
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <h2 className={styles.title}>Last week history</h2>
      <div className={styles.chart}>{value && <Chart data={value} />}</div>
      <ButtonBase
        icon="back"
        onClick={() => history.push('/')}
        label="return"
      />
    </div>
  );
};
