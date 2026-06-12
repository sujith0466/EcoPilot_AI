import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useCalculator } from '../../hooks/useCalculator';
import { CalculatorSummary, STEPS } from './CalculatorSummary';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorResults } from './CalculatorResults';

export default function CalculatorPage() {
  const shouldReduceMotion = useReducedMotion();
  const {
    currentStep,
    loading,
    result,
    formData,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRecalculate,
  } = useCalculator();

  if (result) {
    return <CalculatorResults result={result} handleRecalculate={handleRecalculate} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Carbon Calculator
        </h1>
        <p className="text-lg text-slate-500">
          Measure your monthly environmental impact accurately.
        </p>
      </div>

      <CalculatorSummary currentStep={currentStep} />

      <div className="glass-panel p-8 md:p-12 rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <CalculatorForm
              currentStep={currentStep}
              formData={formData}
              handleChange={handleChange}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200/60">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
              currentStep === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Calculate'}{' '}
              <CheckCircle2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-md hover:bg-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
