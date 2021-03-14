import dayjs from 'dayjs';
import { db } from './init';

export const addWaterNow = async (quantity: number) => {
  const timestamp = dayjs().valueOf();
  return db.post({ quantity: quantity, timestamp: timestamp });
};
