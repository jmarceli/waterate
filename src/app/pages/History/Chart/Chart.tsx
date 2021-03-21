import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';
import { getGroupedData } from '../../../../shared/db/getGroupedData';
import { FORMAT_DISPLAY_DAY } from '../../../../shared/time/time';
import { TooltipContent } from './TooltipContent/TooltipContent';

export const Chart = ({ data }: { data: any[] }) => {
  const now = new Date();
  const [{ value }, fetch] = useAsyncFn(async () => {
    const result: any = await getGroupedData(
      dayjs(now).subtract(1, 'day'),
      dayjs(now).add(1, 'day'),
    );
    // if (!result.docs) {
    //   console.error(result);
    //   throw Error('Unexpected error please reload application');
    // }

    console.log('chart', result);
    return result;
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <ResponsiveContainer height="100%" aspect={375 / 320}>
      <LineChart width={400} height={400} data={value}>
        <YAxis
          tickSize={3}
          mirror
          axisLine={false}
          interval="preserveStartEnd"
        />
        <XAxis
          tickSize={3}
          axisLine={false}
          dataKey="x"
          interval="preserveStartEnd"
          minTickGap={50}
          tickFormatter={(value, index) => {
            return dayjs(value).format(FORMAT_DISPLAY_DAY);
          }}
        />
        <ReferenceLine
          y={2000}
          label="2 liters"
          stroke="red"
          strokeDasharray="3 3"
        />
        <Line type="monotone" dataKey="y" stroke="#003b73" strokeWidth={2} />
        <Tooltip
          cursor={{ stroke: '#7495B5', strokeWidth: 2 }}
          content={<TooltipContent />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Usage example:

// <div className={styles.levelBackground}>
//   <Chart
//     data={[
//       { time: '2021-01-26 08:00', water: 0 },
//       { time: '2021-01-26 09:00', water: 0.2 },
//       { time: '2021-01-26 09:00', water: 0.5 },
//       { time: '2021-01-26 09:00', water: 0.6 },
//       { time: '2021-01-26 10:00', water: 0.8 },
//       { time: '2021-01-26 15:00', water: 0.9 },
//     ]}
//   />
//   <hr className={styles.level} style={{ bottom: percentage + '%' }} />
// </div>

// import React, { PureComponent } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/exh283uh/';

//   render() {
//     return (
//       <LineChart width={300} height={100} data={data}>
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
//       </LineChart>
//     );
//   }
// }
