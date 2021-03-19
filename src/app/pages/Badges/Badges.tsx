import React from 'react';
import styles from './Badges.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonsPanel } from '../../common/ButtonsPanel/ButtonsPanel';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';

export const Badges: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      Badges
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
