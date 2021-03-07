import dayjs from 'dayjs';

export const addWaterNow = async (db: PouchDB.Database, quantity: number) => {
  const timestamp = dayjs().valueOf();
  return db.post({ quantity: quantity, timestamp: timestamp });
};
