import dayjs from 'dayjs';
import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  BarChart,
  Bar,
} from 'recharts';
import { FORMAT_DISPLAY_DAY } from '../../../../shared/time/time';
import { TooltipContent } from './TooltipContent/TooltipContent';

const formatLiters = (value: number) => (value / 1_000).toFixed(1);

// Hide 0 label
const formatYLabel = (value: any, index: number) =>
  !index ? '' : formatLiters(value);

const formatXLabel = (value: any, index: number) =>
  dayjs(value).format(FORMAT_DISPLAY_DAY);

type Props = {
  data: { x: string; y: string }[];
};
export const Chart: React.FC<Props> = ({ data }) => {
  // console.log('chart data', data);
  return (
    <ResponsiveContainer height="100%" aspect={375 / 320}>
      <BarChart width={400} height={400} data={data} barCategoryGap={0}>
        <Tooltip
          cursor={{ opacity: 0.2, fill: '#003b73' }}
          content={<TooltipContent />}
        />
        <YAxis
          tickSize={3}
          tickFormatter={formatYLabel}
          width={30}
          axisLine={false}
          interval="preserveStartEnd"
          stroke="#003b73"
        />
        <XAxis
          tickSize={10}
          dataKey="x"
          interval="preserveStartEnd"
          minTickGap={50}
          tickFormatter={formatXLabel}
          stroke="#003b73"
        />
        <ReferenceLine
          y={2000}
          label="2 liters"
          stroke="red"
          strokeDasharray="3 3"
          isFront
          ifOverflow="extendDomain"
        />
        <Bar dataKey="y" fill="#003b73" />
        {/* <Line type="monotone" dataKey="y" stroke="#003b73" strokeWidth={2} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};
