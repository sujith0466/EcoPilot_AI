import { motion, useReducedMotion } from 'framer-motion';
import type { CarbonCalculationResponse } from '../../types';
import { formatCarbon } from '../../utils/formatters';

interface CalculatorResultsProps {
  result: CarbonCalculationResponse;
  handleRecalculate: () => void;
}

export function CalculatorResults({ result, handleRecalculate }: CalculatorResultsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.section
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden"
        aria-labelledby="results-heading"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

        <h2 id="results-heading" className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
          Your Footprint Analysis
        </h2>

        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 rounded-full border-8 border-emerald-50 flex flex-col items-center justify-center shadow-inner">
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
              role="img"
              aria-label={`Carbon score of ${formatCarbon(result?.total_monthly)} kg CO2e per month`}
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                className="text-emerald-500"
                strokeDasharray="289"
                strokeDashoffset="50"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-5xl font-extrabold text-slate-900">
              {formatCarbon(result?.total_monthly)}
            </span>
            <span className="text-sm font-semibold text-slate-500 mt-1">kg CO₂e / month</span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <p className="text-sm font-bold text-slate-500 mb-1">Carbon Score</p>
            <p className="text-2xl font-extrabold text-slate-800">
              {result?.carbon_score || 'N/A'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
            <p className="text-sm font-bold text-slate-500 mb-1">Impact Level</p>
            <p className="text-2xl font-extrabold text-slate-800">
              {result?.impact_level || 'Unknown'}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4 text-left">Monthly Breakdown</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-left mb-8">
          {Object.entries(result?.breakdown || {}).map(([key, val], i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                {key}
              </p>
              <p className="text-2xl font-extrabold text-slate-800">
                {formatCarbon(val)}{' '}
                <span className="text-base text-slate-500 font-medium">kg</span>
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleRecalculate}
          className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors"
        >
          Recalculate
        </button>
      </motion.section>
    </div>
  );
}
