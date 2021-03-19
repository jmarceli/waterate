import React from 'react';
import styles from './History.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonsPanel } from '../../common/ButtonsPanel/ButtonsPanel';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';

export const History: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      History
      <ButtonsPanel>
        <ButtonBase
          icon="back"
          onClick={() => history.push('/')}
          label="return"
        />
      </ButtonsPanel>
    </div>
  );
};
