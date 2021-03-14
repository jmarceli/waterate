import dayjs from 'dayjs';
import { db } from './init';

export const getWaterForDay = async (date: Date) => {
  return db.find({
    selector: {
      timestamp: {
        $gt: dayjs(date).startOf('day').valueOf(),
        $lt: dayjs(date).endOf('day').valueOf(),
      },
    },
    fields: ['quantity', 'timestamp'],
  });
};
