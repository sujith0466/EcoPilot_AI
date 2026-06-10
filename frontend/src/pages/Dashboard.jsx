import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardData } from '../services/api';
import { Leaf, Flame, Target, Trophy, Sparkles, TrendingDown, Clock, Loader2, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getDashboardData();
        setData(response.data);
      } catch (err) {
        setError(err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="p-12 glass-panel rounded-3xl border border-dashed border-slate-300">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-emerald-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No Tracking Data Found</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't recorded any carbon footprint data yet. Use the calculator to establish your baseline.</p>
          <a href="/calculator" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors">
            Start First Calculation
          </a>
        </div>
      </div>
    );
  }

  // Map history for Recharts with defensive fallbacks
  const chartData = [...(data?.history || [])].reverse().map(h => ({
    date: (h?.calculated_at || '').split('T')[0],
    carbon: h?.total_monthly || 0
  }));

  const { analytics, ai_coach, recommendations, gamification, latest_record } = data;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Welcome back, {data?.username || 'User'}</h1>
          <p className="text-slate-500">Here is your environmental impact intelligence report.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">Level {gamification?.level || 1}</span>
          </div>
          <div className="px-4 py-2 bg-orange-50 rounded-full border border-orange-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-700">{gamification?.streak_days || 0} Day Streak</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Latest Footprint</span>
            <Leaf className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">
              {Number(latest_record?.total_monthly || 0).toFixed(1)}
            </span>
            <span className="text-slate-500 font-medium">kg CO₂</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Monthly Trend</span>
            <TrendingDown className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">
              {(analytics?.improvement_percentage || 0) > 0 ? '+' : ''}
              {Number(analytics?.improvement_percentage || 0).toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Compared to average</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Records</span>
            <Clock className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-slate-900">
              {data?.history?.length || 0}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Historical data points</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500"/> Emission Trends</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="carbon" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCarbon)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500"/> Actionable Recommendations</h3>
            <div className="grid gap-4">
              {(recommendations || []).slice(0, 3).map((rec, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{rec?.title}</h4>
                    <p className="text-sm text-slate-600">{rec?.description}</p>
                  </div>
                </div>
              ))}
              {(!recommendations || recommendations.length === 0) && (
                <p className="text-sm text-slate-500 p-4">No specific recommendations yet. Keep tracking to generate tailored advice.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* AI Coach */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-400"/> AI Carbon Coach</h3>
            <div className="space-y-4 relative z-10">
              <p className="text-slate-300 italic leading-relaxed text-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                "{ai_coach?.insights?.[0] || 'Keep tracking to generate AI insights.'}"
              </p>
              <p className="text-slate-300 italic leading-relaxed text-sm p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                "{ai_coach?.insights?.[1] || 'Your data fuels our predictive models.'}"
              </p>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Trophy className="w-5 h-5 text-emerald-500"/> Recent Achievements</h3>
            <div className="space-y-4">
              {(gamification?.achievements || []).length > 0 ? (gamification?.achievements || []).map((ach, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <span className="font-semibold text-emerald-800 text-sm">{ach?.title}</span>
                  <Trophy className="w-4 h-4 text-emerald-500" />
                </div>
              )) : (
                <p className="text-sm text-slate-500">No achievements yet. Keep tracking!</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
