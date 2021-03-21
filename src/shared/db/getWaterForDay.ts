import dayjs from 'dayjs';
import { FORMAT_DAY } from '../time/time';
import { dbDaily } from './init';

export const getWaterForDay = async (date: Date) => {
  return dbDaily.allDocs({
    key: dayjs(date).format(FORMAT_DAY),
    include_docs: true,
    // selector: {
    //   timestamp: {
    //     $gt: dayjs(date).startOf('day').valueOf(),
    //     $lt: dayjs(date).endOf('day').valueOf(),
    //   },
    // },
    // fields: ['quantity', 'timestamp'],
  });
};
