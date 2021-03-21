import PouchDB from 'pouchdb';
import pouchDbFind from 'pouchdb-find';

console.log('init db');
PouchDB.plugin(pouchDbFind);

export const db = new PouchDB('water');
export const dbDaily = new PouchDB('water_daily');
// PouchDB.debug.enable('*');

// db.createIndex({
//   index: {
//     // fields: ['timestamp'],
//   },
// });

// create a design doc
// var ddoc = {
//   _id: '_design/index',
//   views: {
//     index: {
//       reduce: function reduceFn(keys: any, values: any, rereduce: any) {
//         console.log(keys,values, rereduce);
//         // values.forEach(function(value) => {

//         // });
//         return all;
//       }, //'_sum',
//       map: function mapFun(doc: any) {
//         console.log('doc', doc);
//         if (doc.quantity) {
//           PouchDB.emit(doc.quantity);
//         }
//       }.toString(),
//     },
//   },
// };

// // save the design doc
// db.put(ddoc)
//   .catch(function (err) {
//     if (err.name !== 'conflict') {
//       throw err;
//     }
//     // ignore if doc already exists
//   })
//   .then(function () {
//     // find docs where title === 'Lisa Says'
//     return db.query('index');
//   })
//   .then(function (result) {
//     // handle result
//     console.log('m/r result', result);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

export const listener = dbDaily.changes({
  since: 'now',
  live: true,
});

listener.on('error', (error) => {
  console.error('DB listener error', error);
});
