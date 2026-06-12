import { Sparkles, Trophy } from 'lucide-react';
import type { Gamification } from '../../types';

interface DashboardSidebarProps {
  aiCoach?: string | any;
  gamification?: Gamification;
}

export function DashboardSidebar({ aiCoach, gamification }: DashboardSidebarProps) {
  return (
    <aside className="space-y-8" aria-label="Dashboard Sidebar">
      {/* AI Coach */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl" aria-labelledby="ai-coach-heading">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
        <h3 id="ai-coach-heading" className="text-xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" aria-hidden="true" /> AI Carbon Coach
        </h3>
        <div className="space-y-4 relative z-10">
          <p className="text-slate-300 italic leading-relaxed text-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            "{aiCoach?.insights?.[0] || 'Keep tracking to generate AI insights.'}"
          </p>
          <p className="text-slate-300 italic leading-relaxed text-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            "{aiCoach?.insights?.[1] || 'Your data fuels our predictive models.'}"
          </p>
        </div>
      </section>

      {/* Gamification Stats */}
      <section className="glass-panel p-6 rounded-3xl" aria-labelledby="achievements-heading">
        <h3 id="achievements-heading" className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-500" aria-hidden="true" /> Recent Achievements
        </h3>
        <ul className="space-y-4">
          {(gamification?.achievements || []).length > 0 ? (
            gamification?.achievements?.map((ach: any, i) => (
              <li
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"
              >
                <span className="font-semibold text-emerald-800 text-sm">{ach?.title || ach}</span>
                <Trophy className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              </li>
            ))
          ) : (
            <li className="text-sm text-slate-500">No achievements yet. Keep tracking!</li>
          )}
        </ul>
      </section>
    </aside>
  );
}
