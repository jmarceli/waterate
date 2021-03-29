// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import { recalculateDaily } from './addWaterNow';
import { db } from './init';
import { decrementStats } from './updateStats';

export const removeMostRecent = async () => {
  try {
    const result = await db.allDocs({
      limit: 1,
      include_docs: true,
      descending: true,
    });
    // const result = await db.find({
    //   selector: {
    //     timestamp: {
    //       $gt: dayjs().startOf('day').valueOf(),
    //       $lt: dayjs().endOf('day').valueOf(),
    //     },
    //   },
    //   sort: [{ timestamp: 'desc' }],
    //   limit: 1,
    // });
    // console.log('result', result);
    if (
      result &&
      result.rows &&
      result.rows &&
      result.rows.length > 0 &&
      result.rows[0].doc
    ) {
      const entry: any = result.rows[0].doc;
      await db.remove(entry);

      await decrementStats(entry.quantity.toFixed(0));

      await recalculateDaily(dayjs(entry._id));
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};
