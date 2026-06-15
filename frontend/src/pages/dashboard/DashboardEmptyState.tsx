import { Leaf } from 'lucide-react';

export function DashboardEmptyState() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="p-12 glass-panel rounded-3xl border border-dashed border-slate-300">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-10 h-10 text-emerald-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Tracking Data Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          You haven't recorded any carbon footprint data yet. Use the calculator to establish your
          baseline.
        </p>
        <a
          href="/calculator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
        >
          Start First Calculation
        </a>
      </div>
    </div>
  );
}
