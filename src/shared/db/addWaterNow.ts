import dayjs, { Dayjs } from 'dayjs';
import { db, dbDaily } from './init';

// TODO: maybe wrap with some throttling function instead of retrying
export const addWaterNow = async (quantity: number): Promise<void> => {
  let success = false;
  while (!success) {
    try {
      const isoToday = await addWaterAtSecond(quantity);
      await recalculateDaily(isoToday);
      success = true;
      // console.log('success', success);
    } catch (err) {
      // retry if conflict happens
      if (err.name !== 'conflict') {
        throw err;
      }
    }
  }
};

export const recalculateDaily = async (isoToday: Dayjs): Promise<void> => {
  const query = {
    startkey: isoToday.startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    endkey: isoToday.endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
    include_docs: true,
  };
  // console.log('query', query);
  const allWaterToday = await db.allDocs(query);
  // console.log('allWaterToday', allWaterToday);

  const totalWaterToday = allWaterToday.rows.reduce(
    (total: number, row: any) => total + parseInt(row.doc.quantity),
    0,
  );

  // console.log('totalWaterToday', totalWaterToday);
  let doc = null;
  try {
    doc = await dbDaily.get(isoToday.startOf('day').format('YYYY-MM-DD'));
  } catch (err) {
    if (err.name !== 'not_found') {
      throw err;
    }
  }
  await dbDaily.put({
    _id: isoToday.startOf('day').format('YYYY-MM-DD'),
    quantity: totalWaterToday,
    _rev: doc?._rev, //isoToday.format('YYYY-MM-DDTHH:mm:ss'),
  });
  // const waterToday = await dbDaily.allDocs({
  //   key: isoToday.startOf('day').format('YYYY-MM-DD'),
  //   include_docs: true,
  // });
  // console.log('waterToday', waterToday);
};

const addWaterAtSecond = async (quantity: number): Promise<Dayjs> => {
  const isoDateTime = dayjs();
  await db.put({
    quantity: quantity,
    _id: isoDateTime.format('YYYY-MM-DDTHH:mm:ss'),
  });
  return isoDateTime;
};
