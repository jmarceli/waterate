import React from 'react';
import styles from './Home.module.scss';
import { addWaterNow } from '../../../db/addWaterNow';
import { removeMostRecent } from '../../../db/removeMostRecent';
import { Header } from '../../common/Header/Header';
import { Summary } from './Summary/Summary';
import { ButtonsPanel } from '../../common/ButtonsPanel/ButtonsPanel';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { ButtonAdd } from '../../common/ButtonsPanel/ButtonAdd/ButtonAdd';
import { useHistory } from 'react-router-dom';

type Props = {
  total: number;
  percentage: number;
};
export const Home: React.FC<Props> = ({ total, percentage }) => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.summary}>
        <Summary total={total} percent={percentage} />
      </div>
      <div className={styles.footer}>
        <ButtonsPanel>
          <ButtonBase
            icon="stats"
            onClick={() => history.push('/history')}
            label="history"
          />
          <ButtonBase
            icon="badge"
            onClick={() => history.push('/badges')}
            label="badges"
          />
          {total > 0 && (
            <ButtonBase
              icon="undo"
              onClick={() => removeMostRecent()}
              label="undo latest"
            />
          )}
        </ButtonsPanel>
        <ButtonsPanel>
          <ButtonAdd onClick={() => addWaterNow(100)} label="Cup" icon="150" />
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
    </div>
  );
};
