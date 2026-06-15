import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CarbonRecord } from '../../types';

interface DashboardChartProps {
  history?: CarbonRecord[];
}

export const DashboardChart = React.memo(function DashboardChart({ history = [] }: DashboardChartProps) {
  const chartData = useMemo(() => {
    return [...history].reverse().map((h) => ({
      date: (h?.calculated_at || '').split('T')[0],
      carbon: h?.total_monthly || 0,
    }));
  }, [history]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section 
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      className="glass-panel p-6 rounded-3xl"
      aria-labelledby="chart-heading"
    >
      <h3 id="chart-heading" className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-emerald-500" aria-hidden="true" /> Emission Trends
      </h3>
      <div className="sr-only">
        This chart displays your monthly carbon footprint trend. 
        It shows {chartData.length} data points ending on {chartData[chartData.length - 1]?.date || 'no data'}.
      </div>
      <div className="h-[300px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow:
                  '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="carbon"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCarbon)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
});
