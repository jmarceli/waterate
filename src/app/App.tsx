import React, { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { listener } from '../db/init';
import styles from './App.module.scss';
import { addWaterNow } from '../db/addWaterNow';
import { removeMostRecent } from '../db/removeMostRecent';
import { getWaterForDay } from '../db/getWaterForDay';
import { Wave } from './Wave/Wave';
import { Header } from './Header/Header';
import { Summary } from './Summary/Summary';
import { ButtonsPanel } from './ButtonsPanel/ButtonsPanel';
import { ButtonBase } from './ButtonsPanel/ButtonBase/ButtonBase';
import { ButtonAdd } from './ButtonsPanel/ButtonAdd/ButtonAdd';

const RECOMMENDED_AMOUNT = 2000; // ml

export const App: React.FC = () => {
  const now = new Date();
  const [{ value }, fetch] = useAsyncFn(async () => {
    const result: any = await getWaterForDay(now);
    if (!result.docs) {
      console.error(result);
      throw Error('Unexpected error please reload application');
    }

    return result.docs;
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch();
    listener.on('change', () => {
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

  return (
    <div className={styles.root}>
      <div className={styles.background}>
        <Wave height={percentage} />
      </div>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.summary}>
          <Summary total={total} percent={percentage} />
        </div>
        <div className={styles.footer}>
          <ButtonsPanel>
            <ButtonBase icon="stats" onClick={() => {}} label="history" />
            <ButtonBase
              icon="badge"
              onClick={() => removeMostRecent()}
              label="badges"
            />
            <ButtonBase
              icon="undo"
              onClick={() => removeMostRecent()}
              label="undo latest"
            />
          </ButtonsPanel>
          <ButtonsPanel>
            <ButtonAdd
              onClick={() => addWaterNow(100)}
              label="Cup"
              icon="150"
            />
            <ButtonAdd
              onClick={() => addWaterNow(200)}
              label="Glass"
              icon="200"
            />
            <ButtonAdd
              onClick={() => addWaterNow(300)}
              label="Large Glass"
              icon="300"
            />
          </ButtonsPanel>
        </div>
      </main>
    </div>
  );
};
