import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, TrendingDown, Clock } from 'lucide-react';
import type { CarbonRecord } from '../../types';

interface AnalyticsData {
  improvement_percentage?: number;
}

interface DashboardStatsProps {
  latestRecord?: CarbonRecord | null;
  analytics?: AnalyticsData;
  totalRecords?: number;
}

export function DashboardStats({ latestRecord, analytics, totalRecords = 0 }: DashboardStatsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.1, duration: shouldReduceMotion ? 0 : 0.5 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-colors" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Latest Footprint
          </span>
          <Leaf className="w-5 h-5 text-emerald-500" aria-hidden="true" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-900">
            {Number(latestRecord?.total_monthly || 0).toFixed(1)}
          </span>
          <span className="text-slate-500 font-medium">kg CO₂</span>
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.5 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden group"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Monthly Trend
          </span>
          <TrendingDown className="w-5 h-5 text-blue-500" aria-hidden="true" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-900">
            {(analytics?.improvement_percentage || 0) > 0 ? '+' : ''}
            {Number(analytics?.improvement_percentage || 0).toFixed(1)}%
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2">Compared to average</p>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0 : 0.5 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden group"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Total Records
          </span>
          <Clock className="w-5 h-5 text-indigo-500" aria-hidden="true" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-slate-900">
            {totalRecords}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-2">Historical data points</p>
      </motion.div>
    </div>
  );
}
