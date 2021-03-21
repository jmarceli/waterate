// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import { recalculateDaily } from './addWaterNow';
import { db } from './init';

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
      await db.remove(result.rows[0].doc);

      await recalculateDaily(dayjs(result.rows[0].doc._id));
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};
