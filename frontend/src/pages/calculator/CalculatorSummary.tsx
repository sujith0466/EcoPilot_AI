import { CheckCircle2 } from 'lucide-react';
import { CALCULATOR_STEPS } from '../../constants/calculator';

interface CalculatorSummaryProps {
  currentStep: number;
}

export function CalculatorSummary({ currentStep }: CalculatorSummaryProps) {
  return (
    <div className="flex items-center justify-between mb-12 relative">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{ width: `${(currentStep / (CALCULATOR_STEPS.length - 1)) * 100}%` }}
      />

      {CALCULATOR_STEPS.map((step, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;
        return (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : isPast
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}
            >
              {isPast ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isActive ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
