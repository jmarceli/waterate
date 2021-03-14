import React from 'react';
import { ButtonAdd } from './ButtonAdd/ButtonAdd';
import styles from './ButtonsPanel.module.scss';

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
      <ButtonAdd onClick={() => addHandler(100)}>Cup (100ml)</ButtonAdd>
      <ButtonAdd onClick={() => addHandler(200)}>Glass (200ml)</ButtonAdd>
      <ButtonAdd onClick={() => addHandler(300)}>Large Glass (300ml)</ButtonAdd>
      <div>
        <button
          style={{
            visibility: total > 0 ? 'visible' : 'hidden',
          }}
          onClick={() => undoHandler()}
        >
          Undo last change
        </button>
      </div>
    </div>
  );
};
