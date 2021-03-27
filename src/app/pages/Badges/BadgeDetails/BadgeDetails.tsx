import React from 'react';
import styles from './BadgeDetails.module.scss';
import { badgesList } from '../../../../shared/badgesList';
import { Badge } from '../Badge/Badge';

type Props = {
  selectedBadgeId: string;
};
export const BadgeDetails: React.FC<Props> = ({ selectedBadgeId }) => {
  const badge = badgesList.find((badge: any) => badge.icon === selectedBadgeId);
  return (
    <div className={styles.root}>
      <Badge
        icon={badge.icon}
        label={badge.label}
        discovered={badge.discovered}
        onClick={() => {}}
        details={badge.details}
        fullView
      />
    </div>
  );
};
