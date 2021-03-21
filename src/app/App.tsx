import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { listener } from '../shared/db/init';
import { Wave } from './common/Wave/Wave';
import { Badges } from './pages/Badges/Badges';
import { History } from './pages/History/History';
import { Home } from './pages/Home/Home';
import styles from './App.module.scss';
import { useAsyncFn } from 'react-use';
import { getWaterForDay } from '../shared/db/getWaterForDay';

const RECOMMENDED_AMOUNT = 2000; // ml

export const App: React.FC = () => {
  const now = new Date();
  const [{ value }, fetch] = useAsyncFn(async () => {
    const result: any = await getWaterForDay(now);
    if (!result.rows) {
      console.error(result);
      throw Error('Unexpected error please reload application');
    }
    // console.log('waterForDay', result);
    return result.rows;
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch();
    // TODO: add dbDaily listener
    listener.on('change', () => {
      fetch();
    });
    return () => listener.cancel();
  }, [fetch]);

  useEffect(() => {
    if (!value) return;
    setTotal(
      value.reduce((sum: number, el: any) => sum + (el as any).doc.quantity, 0),
    );
  }, [value]);
  const percentage = Math.round((total / RECOMMENDED_AMOUNT) * 100);

  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <Wave height={percentage} />
      </div>
      <main className={styles.main}>
        <Router>
          <Switch>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/badges">
              <Badges />
            </Route>
            <Route path="/">
              <Home total={total} percentage={percentage} />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
};
