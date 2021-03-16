import dayjs from 'dayjs';
import { db } from './init';

export const removeMostRecent = async () => {
  try {
    const result = await db.find({
      selector: {
        timestamp: {
          $gt: dayjs().startOf('day').valueOf(),
          $lt: dayjs().endOf('day').valueOf(),
        },
      },
      sort: [{ timestamp: 'desc' }],
      limit: 1,
    });
    if (result && result.docs && result.docs.length > 0) {
      return db.remove(result.docs[0]);
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};
