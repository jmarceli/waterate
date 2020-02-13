import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';
import { useAsyncFn } from 'react-use';
import { format } from 'date-fns';

const POURING_TIMEOUT = 500; // ms

PouchDB.plugin(pouchDbFind);

const db = new PouchDB('water');
db.createIndex({
  index: {
    fields: ['day'],
  },
});
// db.info().then(function(info) {
//   console.log(info);
//   // db.put({ _id: '123', test: 123 });
//   // console.log(info);
// });

const addWater = async (quantity: number, day: string) => {
  return db.post({ quantity: quantity, day: day });
};

// addWater(100, startOfToday().toISOString());
console.log(format(Date.now(), 'yyyy-MM-dd'));
const getWaterForDay = async (day: string) => {
  return db.find({ selector: { day }, fields: ['quantity', 'day'] });
};

const listener = db.changes({
  since: 'now',
  live: true,
});

listener.on('error', error => {
  console.error('DB listener error', error);
});

const App: React.FC = () => {
  const [{ loading, error, value }, fetch] = useAsyncFn(async () => {
    const result: any = await getWaterForDay(format(Date.now(), 'yyyy-MM-dd'));
    if (!result.docs) {
      console.error(result);
      throw Error('Unexpected error please reload application');
    }
    await new Promise(resolve => setTimeout(() => resolve(), POURING_TIMEOUT));

    return result.docs.reduce(
      (sum: number, el: any) => sum + (el as any).quantity,
      0,
    );
  });

  useEffect(() => {
    fetch();
    listener.on('change', change => {
      // console.log('change', change);
      fetch();
    });
    return () => listener.cancel();
  }, [fetch]);

  console.log('value', value, loading, error);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => addWater(100, format(Date.now(), 'yyyy-MM-dd'))}>
          Add water
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        val: {loading ? 'pouring...' : value}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactabc
        </a>
      </header>
    </div>
  );
};

export default App;
