import { dbStats } from './init';

type Stats = { _id: string; value: number };

const updateStats = async (name: string, value: number) => {
  let doc = null;
  try {
    doc = await dbStats.get(name);
  } catch (err) {
    if (err.name !== 'not_found') {
      throw err;
    }
  }
  return await dbStats.put(
    {
      _id: name,
      _rev: doc?._rev,
      value: value,
    },
    { force: true },
  );
};

export const getStats = async (name: string): Promise<Stats> => {
  try {
    return await dbStats.get(name);
  } catch (error) {
    return { _id: name, value: 0 };
  }
};

export const decrementStats = async (name: string) => {
  try {
    const currentValue = await getStats(name);
    await updateStats(name, currentValue.value - 1);
  } catch (error) {
    console.error(error);
    return 1;
  }
  return 0;
};

export const incrementStats = async (name: string) => {
  try {
    const currentValue = await getStats(name);
    await updateStats(name, currentValue.value + 1);
  } catch (error) {
    console.error(error);
    return 1;
  }
  return 0;
};
