import React, { useEffect } from 'react';
import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';
import { useAsyncFn } from 'react-use';
import {
  startOfToday,
  endOfToday,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';

import styles from './App.module.scss';

const RECOMMENDED_AMOUNT = 2000; // ml
const POURING_TIMEOUT = 100; // ms

PouchDB.plugin(pouchDbFind);

const db = new PouchDB('water');
db.createIndex({
  index: {
    fields: ['date'],
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

const addWater = async (quantity: number, date: Date) => {
  return db.post({ quantity: quantity, date: date });
};

const removeMostRecent = async () => {
  // const now = new Date(); //format(Date.now(), 'yyyy-MM-dd');
  try {
    const result = await db.find({
      selector: { date: { $gt: startOfToday(), $lt: endOfToday() } },
      sort: [{ date: 'desc' }],
      limit: 1,
    });
    // console.log('result', result);
    if (result && result.docs && result.docs.length > 0) {
      return db.remove(result.docs[0]);
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// addWater(100, startOfToday().toISOString());
// console.log(format(Date.now(), 'yyyy-MM-dd'));
const getWaterForDay = async (date: Date) => {
  return db.find({
    selector: { date: { $gt: startOfDay(date), $lt: endOfDay(date) } },
    fields: ['quantity', 'date'],
  });
};

const listener = db.changes({
  since: 'now',
  live: true,
});

listener.on('error', (error) => {
  console.error('DB listener error', error);
});

const App: React.FC = () => {
  const now = new Date();
  const [{ loading, error, value }, fetch] = useAsyncFn(async () => {
    const result: any = await getWaterForDay(now);
    if (!result.docs) {
      console.error(result);
      throw Error('Unexpected error please reload application');
    }
    await new Promise((resolve) =>
      setTimeout(() => resolve(), POURING_TIMEOUT),
    );

    return result.docs;
  });

  useEffect(() => {
    fetch();
    listener.on('change', (change) => {
      // console.log('change', change);
      fetch();
    });
    return () => listener.cancel();
  }, [fetch]);
  const total =
    value &&
    value.reduce((sum: number, el: any) => sum + (el as any).quantity, 0);
  const percentage = Math.round((total / RECOMMENDED_AMOUNT) * 100);

  // console.log('value', value, loading, error);
  return (
    <div className={styles.app}>
      <div className={styles.levelBackground}>
        <hr className={styles.level} style={{ bottom: percentage + '%' }} />
      </div>
      <div className={styles.background}>
        <header className={styles.header}>
          <h1>{format(now, 'dd MMM yyyy')}</h1>
          Track your daily water consumption!
        </header>
        <main className={styles.main}>
          <div className={styles.buttons}>
            <button onClick={() => addWater(200, now)}>Glass (200ml)</button>
            <button onClick={() => addWater(500, now)}>
              Small bottle (500ml)
            </button>
            <button onClick={() => addWater(1000, now)}>
              Large bottle (1l)
            </button>
          </div>
          <div className={styles.summary}>
            {!loading && (
              <div>
                Total amount of water drank today {total} ml.
                <br />
                Which is about {percentage}% of recommended 2 liters per day.
              </div>
            )}
          </div>
          <div>
            <button
              style={{
                visibility: value && value.length > 0 ? 'visible' : 'hidden',
              }}
              onClick={() => removeMostRecent()}
            >
              Undo last change
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
