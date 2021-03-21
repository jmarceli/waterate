import { Dayjs } from 'dayjs';
import { groupBy, sumBy } from 'lodash';
import { FORMAT_DAY } from '../time/time';
import { dbDaily } from './init';

export const getGroupedData = async (startTime: Dayjs, endTime: Dayjs) => {
  const startKey = startTime.startOf('day').format(FORMAT_DAY);
  const endKey = endTime.startOf('day').format(FORMAT_DAY);
  // console.log('startKey', startKey);
  // console.log('endKey', endKey);
  const result = await dbDaily.allDocs({
    include_docs: true,
    startkey: startKey,
    endkey: endKey,
    limit: 400,
  });
  const hourly = groupBy(result.rows, (row: any) => {
    return row.doc._id.substr(0, 13);
  });
  // console.log('hourly', hourly);

  const hourlyAvg: any = {};
  Object.entries(hourly).forEach((kv: any) => {
    // console.log('values', kv);
    hourlyAvg[kv[0]] = sumBy(kv[1], (value: any) => {
      // console.log('doc', doc);
      return value.doc.quantity;
    });
  });

  // console.log('hourlyAvg', hourlyAvg);
  return hourlyAvg;
};
