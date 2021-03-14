import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';

console.log('init db');
PouchDB.plugin(pouchDbFind);

export const db = new PouchDB('water');

db.createIndex({
  index: {
    fields: ['timestamp'],
  },
});

export const listener = db.changes({
  since: 'now',
  live: true,
});

listener.on('error', (error) => {
  console.error('DB listener error', error);
});
