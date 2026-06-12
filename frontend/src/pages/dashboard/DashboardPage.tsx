import { Loader2 } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardChart } from './DashboardChart';
import { DashboardRecommendations } from './DashboardRecommendations';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardEmptyState } from './DashboardEmptyState';

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading intelligence suite...</p>
      </div>
    );
  }

  if (error) {
    throw error; // This will be caught by the ErrorBoundary
  }

  if (!data || !data.history || data.history.length === 0) {
    return <DashboardEmptyState />;
  }

  const { analytics, ai_coach, recommendations, gamification, latest_record } = data;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <DashboardHeader username={data?.username} gamification={gamification} />
      
      <DashboardStats 
        latestRecord={latest_record} 
        analytics={analytics} 
        totalRecords={data?.history?.length} 
      />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DashboardChart history={data?.history} />
          <DashboardRecommendations recommendations={recommendations} />
        </div>

        <DashboardSidebar aiCoach={ai_coach} gamification={gamification} />
      </div>
    </div>
  );
}
