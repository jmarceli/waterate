import React, { useState } from 'react';
import styles from './Badges.module.scss';
import { Header } from '../../common/Header/Header';
import { ButtonsPanel } from '../../common/ButtonsPanel/ButtonsPanel';
import { ButtonBase } from '../../common/ButtonsPanel/ButtonBase/ButtonBase';
import { useHistory } from 'react-router-dom';
import { Badge } from './Badge/Badge';
import { BadgeDetails } from './BadgeDetails/BadgeDetails';
import { badgesList } from '../../../shared/badgesList';

export const Badges: React.FC = () => {
  const [selectedBadgeId, setSelectedBadgeId] = useState('');
  const history = useHistory();
  const showDetails = (selectedBadgeId: string) => {
    setSelectedBadgeId(selectedBadgeId);
  };
  const hideDetails = () => {
    setSelectedBadgeId('');
  };
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header subtitle="Get unique water badges!" />
      </div>
      {selectedBadgeId && <BadgeDetails selectedBadgeId={selectedBadgeId} />}
      {!selectedBadgeId && (
        <>
          <p>Badges support will be added soon!</p>
          <div className={styles.badgesList}>
            {badgesList.map((badge) => (
              <Badge
                icon={badge.icon}
                label={badge.label}
                discovered={badge.discovered}
                onClick={showDetails}
                details={badge.details}
                key={badge.icon}
              />
            ))}
          </div>
        </>
      )}
      <ButtonsPanel>
        <ButtonBase
          icon="back"
          onClick={() => {
            selectedBadgeId ? hideDetails() : history.push('/');
          }}
          label="return"
        />
      </ButtonsPanel>
    </div>
  );
};
