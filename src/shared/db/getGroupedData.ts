import dayjs, { Dayjs } from 'dayjs';
import { FORMAT_DAY } from '../time/time';
import { db } from './init';

export const getGroupedData = async (startTime: Dayjs, endTime: Dayjs) => {
  const startKey = startTime.startOf('day').format(FORMAT_DAY);
  const endKey = endTime.startOf('day').format(FORMAT_DAY);
  return db.allDocs({
    include_docs: true,
    startkey: startKey,
    endkey: endKey,
  });
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
