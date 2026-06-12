import { Target, Sparkles } from 'lucide-react';
import type { Recommendation } from '../../types';

interface DashboardRecommendationsProps {
  recommendations?: Recommendation[];
}

export function DashboardRecommendations({ recommendations = [] }: DashboardRecommendationsProps) {
  return (
    <section className="glass-panel p-6 rounded-3xl" aria-labelledby="recommendations-heading">
      <h3 id="recommendations-heading" className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-emerald-500" aria-hidden="true" /> Actionable Recommendations
      </h3>
      <ul className="grid gap-4">
        {recommendations.slice(0, 3).map((rec, i) => (
          <li
            key={i}
            className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">{rec?.title}</h4>
              <p className="text-sm text-slate-600">{rec?.description}</p>
            </div>
          </li>
        ))}
        {(!recommendations || recommendations.length === 0) && (
          <li className="text-sm text-slate-500 p-4">
            No specific recommendations yet. Keep tracking to generate tailored advice.
          </li>
        )}
      </ul>
    </section>
  );
}
