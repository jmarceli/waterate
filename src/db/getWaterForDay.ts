import dayjs from 'dayjs';

export const getWaterForDay = async (db: PouchDB.Database, date: Date) => {
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
