import React from 'react';
import styles from './Badges.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonsPanel } from '../../common/ButtonsPanel/ButtonsPanel';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';
import { Badge } from './Badge/Badge';

export const Badges: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header subtitle="Get unique water badges!" />
      </div>
      <div>
        <Badge icon="firstSip" label="First Sip" discovered />
        <Badge icon="waterWeek" label="Water Week" discovered />
        <Badge icon="waterMonth" label="Water Month" />
        <Badge icon="unknown" label="Unknown" />
        <Badge icon="unknown" label="Unknown" />
        <Badge icon="unknown" label="Unknown" />
        <Badge icon="unknown" label="Unknown" />
        <Badge icon="unknown" label="Unknown" />
        <Badge icon="unknown" label="Unknown" />
      </div>
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
