import React from 'react';
import { ButtonAdd } from './ButtonAdd/ButtonAdd';
import styles from './ButtonsPanel.module.scss';
import { ButtonUndo } from './ButtonUndo/ButtonUndo';

type Props = {
  addHandler: (quantity: number) => void;
  undoHandler: () => void;
  total: number;
};
export const ButtonsPanel: React.FC<Props> = ({
  addHandler,
  undoHandler,
  total,
}) => {
  return (
    <div className={styles.root}>
      <ButtonAdd onClick={() => addHandler(100)} label="Cup" icon="150" />
      <ButtonAdd onClick={() => addHandler(200)} label="Glass" icon="200" />
      <ButtonAdd
        onClick={() => addHandler(300)}
        label="Large Glass"
        icon="300"
      />
      <ButtonUndo total={total} undoHandler={undoHandler} />
    </div>
  );
};
