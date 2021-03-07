import React, { useEffect, useState } from 'react';
import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';
import { useAsyncFn } from 'react-use';
import { Chart } from './Chart/Chart';

import styles from './App.module.scss';
import { ButtonAdd } from './ButtonAdd/ButtonAdd';
import dayjs from 'dayjs';
import { addWaterNow } from '../db/addWaterNow';
import { removeMostRecent } from '../db/removeMostRecent';
import { getWaterForDay } from '../db/getWaterForDay';
import { Wave } from './Wave/Wave';

const RECOMMENDED_AMOUNT = 2000; // ml
// const POURING_TIMEOUT = 100; // ms

PouchDB.plugin(pouchDbFind);

const db = new PouchDB('water');
db.createIndex({
  index: {
    fields: ['timestamp'],
  },
});

// just logging
// db.find({
//   selector: {},
//   sort: [{ date: 'desc' }],
// }).then(console.log);
// db.info().then(function(info) {
//   console.log(info);
//   // db.put({ _id: '123', test: 123 });
//   // console.log(info);
// });

// const addWaterNow = async (quantity: number) => {
//   const timestamp = dayjs().valueOf();
//   return db.post({ quantity: quantity, timestamp: timestamp });
// };

// it will not work well with large timeseries dataset
// const d = new Date();
// for (let i = 0; i < 1e4; i++) {
//   addWater(i % 100, d);
// }

// addWater(100, startOfToday().toISOString());
// console.log(format(Date.now(), 'yyyy-MM-dd'));
// const getWaterForDay = async (date: Date) => {
//   return db.find({
//     selector: {
//       timestamp: {
//         $gt: dayjs(date).startOf('day').valueOf(),
//         $lt: dayjs(date).endOf('day').valueOf(),
//       },
//     },
//     fields: ['quantity', 'timestamp'],
//   });
// };

const listener = db.changes({
  since: 'now',
  live: true,
});

listener.on('error', (error) => {
  console.error('DB listener error', error);
});

export const App: React.FC = () => {
  const now = new Date();
  const [{ value }, fetch] = useAsyncFn(async () => {
    const result: any = await getWaterForDay(db, now);
    if (!result.docs) {
      console.error(result);
      throw Error('Unexpected error please reload application');
    }
    // await new Promise((resolve) =>
    //   setTimeout(() => resolve(), POURING_TIMEOUT),
    // );

    return result.docs;
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch();
    listener.on('change', (change) => {
      // console.log('change', change);
      fetch();
    });
    return () => listener.cancel();
  }, [fetch]);

  useEffect(() => {
    if (!value) return;
    setTotal(
      value.reduce((sum: number, el: any) => sum + (el as any).quantity, 0),
    );
  }, [value]);
  const percentage = Math.round((total / RECOMMENDED_AMOUNT) * 100);

  // console.log('value', value, loading, error);
  return (
    <div className={styles.app}>
      <div className={styles.levelBackground}>
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
        {/* <hr className={styles.level} style={{ bottom: percentage + '%' }} /> */}
      </div>
      <div className={styles.backgroundWater}>
        <Wave height={percentage} />
      </div>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>{dayjs(now).format('DD MMM YYYY')}</h1>
          Track your daily water consumption!
        </header>
        <main className={styles.content}>
          <div className={styles.buttons}>
            <ButtonAdd onClick={() => addWaterNow(db, 200)}>
              Glass (200ml)
            </ButtonAdd>
            <ButtonAdd onClick={() => addWaterNow(db, 500)}>
              Small bottle (500ml)
            </ButtonAdd>
            <ButtonAdd onClick={() => addWaterNow(db, 1000)}>
              Large bottle (1l)
            </ButtonAdd>
          </div>
          <div className={styles.summary}>
            <div>
              Total amount of water drank today {total} ml.
              <br />
              Which is about {percentage}% of recommended 2 liters per day.
            </div>
          </div>
          <div>
            <button
              style={{
                visibility: total > 0 ? 'visible' : 'hidden',
              }}
              onClick={() => removeMostRecent(db)}
            >
              Undo last change
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
