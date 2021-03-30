import dayjs, { Dayjs } from 'dayjs';
import { db, dbDaily } from './init';
import { incrementStats } from './updateStats';

// TODO: maybe wrap with some throttling function instead of retrying
export const addWaterNow = async (quantity: number): Promise<void> => {
  let success = false;
  while (!success) {
    try {
      const isoToday = await addWaterAtSecond(quantity);
      try {
        await incrementStats(quantity.toFixed(0));
      } catch (error) {
        console.error(error);
      }
      try {
        await recalculateDaily(isoToday);
      } catch (error) {
        console.error(error);
      }
      success = true;
      // console.log('success', success);
    } catch (err) {
      // retry if conflict happens
      if (err.name !== 'conflict') {
        console.error(err);
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
  await updateWaterAtDay(
    isoToday.startOf('day').format('YYYY-MM-DD'),
    totalWaterToday,
  );
};

const updateWaterAtDay = async (id: string, quantity: number) => {
  let docs = null;
  try {
    docs = await dbDaily.allDocs({ key: id });
  } catch (err) {
    if (err.name !== 'not_found') {
      throw err;
    }
  }
  // console.log(docs);
  // console.log(quantity);
  const res = await dbDaily.put(
    {
      _id: id,
      _rev: docs && docs.rows[0] ? docs.rows[0].value.rev : undefined, //isoToday.format('YYYY-MM-DDTHH:mm:ss'),
      quantity: quantity,
    },
    { force: true },
  );
  // console.log(res);
  return res;
};

const addWaterAtSecond = async (quantity: number): Promise<Dayjs> => {
  const isoDateTime = dayjs();
  await db.put({
    quantity: quantity,
    _id: isoDateTime.format('YYYY-MM-DDTHH:mm:ss'),
  });
  return isoDateTime;
};

// const removeRange = async () => {
//   const allWaterToday = await db.allDocs({
//     startkey: '2021-03-29T00:00:00',
//     endkey: '2021-03-30T00:00:00',
//     include_docs: true,
//   });
//   console.log('allWaterToday', allWaterToday);
//   for (let i = 0; i < allWaterToday.rows.length; i++) {
//     const row = allWaterToday.rows[i];
//     if (row.doc) await db.remove(row.doc);
//     console.log('removed', row.doc);
//   }
// }
