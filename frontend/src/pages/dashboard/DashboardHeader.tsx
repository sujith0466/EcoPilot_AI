import { Trophy, Flame } from 'lucide-react';
import type { Gamification } from '../../types';

interface DashboardHeaderProps {
  username?: string;
  gamification?: Gamification;
}

export function DashboardHeader({ username, gamification }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6" aria-label="Dashboard Header">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Welcome back, {username || 'User'}
        </h1>
        <p className="text-slate-500">Here is your environmental impact intelligence report.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">
            Level {gamification?.level || 1}
          </span>
        </div>
        <div className="px-4 py-2 bg-orange-50 rounded-full border border-orange-100 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-orange-700">
            {gamification?.streak_days || 0} Day Streak
          </span>
        </div>
      </div>
    </header>
  );
}
