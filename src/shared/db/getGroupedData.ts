import dayjs, { Dayjs } from 'dayjs';
import { groupBy, sumBy } from 'lodash';
import { FORMAT_DAY } from '../time/time';
import { db } from './init';

export const getGroupedData = async (startTime: Dayjs, endTime: Dayjs) => {
  const startKey = startTime.startOf('day').format(FORMAT_DAY);
  const endKey = endTime.startOf('day').format(FORMAT_DAY);
  console.log('startKey', startKey);
  console.log('endKey', endKey);
  const result = await db.allDocs({
    include_docs: true,
    startkey: startKey,
    endkey: endKey,
    limit: 400,
  });
  const hourly = groupBy(result.rows, (row: any) => {
    return row.doc._id.substr(0, 13);
  });
  console.log('hourly', hourly);

  const hourlyAvg: any = {};
  Object.entries(hourly).forEach((kv: any) => {
    console.log('values', kv);
    hourlyAvg[kv[0]] = sumBy(kv[1], (value: any) => {
      // console.log('doc', doc);
      return value.doc.quantity;
    });
  });

  console.log('hourlyAvg', hourlyAvg);
  // TODO: convert to array of objects to use one key for Xaxis and the other for Yaxis
  const measurementsList = Object.keys(hourlyAvg).reduce(
    (all: any[], key: string) => {
      return [...all, { x: key, y: hourlyAvg[key] }];
    },
    [],
  );
  return measurementsList;
  // return db.find({
  //   // startkey: 1615763586565,
  //   // endkey: 1616185910066,
  //   selector: {
  //     timestamp: {
  //       $gt: endTime.subtract(7, 'day').valueOf(),
  //       $lt: endTime.valueOf(),
  //     },
  //   },
  //   fields: ['_id', 'quantity', 'timestamp'],
  // });
  // return db.find({
  //   selector: {
  //     timestamp: {
  //       $gt: endTime.subtract(7, 'day').valueOf(),
  //       $lt: endTime.valueOf(),
  //     },
  //   },
  //   fields: ['quantity', 'timestamp'],
  // });
};
