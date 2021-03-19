import React from 'react';
import styles from './ButtonAdd.module.scss';
import src150 from './water-150.svg';
import src200 from './water-200.svg';
import src300 from './water-300.svg';

type Props = {
  onClick: () => void;
  label: string;
  icon: '150' | '200' | '300';
};

const icons = {
  '150': src150,
  '200': src200,
  '300': src300,
};

export const ButtonAdd: React.FC<Props> = ({ onClick, label, icon }) => {
  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={onClick}>
        <img className={styles.icon} src={icons[icon]} alt="water" />
      </button>
      <div className={styles.label}>
        {label}
        <br />
        {icon}ml
      </div>
    </div>
  );
};
