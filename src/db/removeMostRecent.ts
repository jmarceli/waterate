import dayjs from 'dayjs';
import { db } from './init';

export const removeMostRecent = async () => {
  // const now = new Date(); //format(Date.now(), 'yyyy-MM-dd');
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
    // console.log('result', result);
    if (result && result.docs && result.docs.length > 0) {
      return db.remove(result.docs[0]);
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};
