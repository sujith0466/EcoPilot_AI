import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, Car, Home, Leaf, Loader2 } from 'lucide-react';
import { calculateFootprint } from '../services/api';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'transport', title: 'Transport', icon: Car },
  { id: 'home', title: 'Home & Diet', icon: Home },
  { id: 'lifestyle', title: 'Lifestyle', icon: Leaf }
];

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    transport_mode: 'car',
    transport_distance: 15,
    transport_days: 30,
    electricity_units: 200,
    food_diet: 'mixed',
    shopping_tier: 'medium',
    waste_tier: 'medium'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await calculateFootprint(formData);
      setResult(response.data);
      toast.success("Calculation complete!");
    } catch (err) {
      toast.error("Failed to calculate footprint");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="transport_mode" className="block text-sm font-semibold text-slate-700 mb-2">Primary Transport Mode</label>
              <select id="transport_mode" name="transport_mode" value={formData.transport_mode} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all">
                <option value="car">Car (Gasoline)</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="bus">Public Transit (Bus)</option>
                <option value="train">Train / Subway</option>
                <option value="bicycle">Bicycle</option>
                <option value="walking">Walking</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="transport_distance" className="block text-sm font-semibold text-slate-700 mb-2">Daily Distance (km)</label>
                <input id="transport_distance" type="number" name="transport_distance" value={formData.transport_distance} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="transport_days" className="block text-sm font-semibold text-slate-700 mb-2">Days per month</label>
                <input id="transport_days" type="number" name="transport_days" value={formData.transport_days} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all" />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="electricity_units" className="block text-sm font-semibold text-slate-700 mb-2">Monthly Electricity (kWh)</label>
              <input id="electricity_units" type="number" name="electricity_units" value={formData.electricity_units} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all" />
            </div>
            <div>
              <label htmlFor="food_diet" className="block text-sm font-semibold text-slate-700 mb-2">Dietary Preference</label>
              <select id="food_diet" name="food_diet" value={formData.food_diet} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all">
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="mixed">Mixed</option>
                <option value="vegetarian">Vegetarian</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="shopping_tier" className="block text-sm font-semibold text-slate-700 mb-2">Shopping Habit</label>
              <select id="shopping_tier" name="shopping_tier" value={formData.shopping_tier} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all">
                <option value="low">Minimalist (Low)</option>
                <option value="medium">Average (Medium)</option>
                <option value="high">Frequent (High)</option>
              </select>
            </div>
            <div>
              <label htmlFor="waste_tier" className="block text-sm font-semibold text-slate-700 mb-2">Waste Generation</label>
              <select id="waste_tier" name="waste_tier" value={formData.waste_tier} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all">
                <option value="low">Low (Recycles everything)</option>
                <option value="medium">Medium (Average)</option>
                <option value="high">High (Lots of waste)</option>
              </select>
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
          
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8">Your Footprint Analysis</h2>
          
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 rounded-full border-8 border-emerald-50 flex flex-col items-center justify-center shadow-inner">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-emerald-500" strokeDasharray="289" strokeDashoffset="50" strokeLinecap="round" />
              </svg>
              <span className="text-5xl font-extrabold text-slate-900">{(Number(result?.total_monthly) || 0).toFixed(1)}</span>
              <span className="text-sm font-semibold text-slate-500 mt-1">kg CO₂e / month</span>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <p className="text-sm font-bold text-slate-500 mb-1">Carbon Score</p>
              <p className="text-2xl font-extrabold text-slate-800">{result?.carbon_score || 'N/A'}</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
              <p className="text-sm font-bold text-slate-500 mb-1">Impact Level</p>
              <p className="text-2xl font-extrabold text-slate-800">{result?.impact_level || 'Unknown'}</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-4 text-left">Monthly Breakdown</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-left mb-8">
            {Object.entries(result?.breakdown || {}).map(([key, val], i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{key}</p>
                <p className="text-2xl font-extrabold text-slate-800">{(Number(val) || 0).toFixed(1)} <span className="text-base text-slate-500 font-medium">kg</span></p>
              </div>
            ))}
          </div>

          <button onClick={() => setResult(null)} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors">
            Recalculate
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Carbon Calculator</h1>
        <p className="text-lg text-slate-500">Measure your monthly environmental impact accurately.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
        <div className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
        
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : isPast ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
                {isPast ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200/60">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {currentStep === STEPS.length - 1 ? (
            <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Calculate'} <CheckCircle2 className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleNext} className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-md hover:bg-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all">
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
