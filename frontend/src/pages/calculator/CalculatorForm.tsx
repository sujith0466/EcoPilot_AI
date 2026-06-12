import React from 'react';
import type { CarbonCalculationRequest } from '../../types';

interface CalculatorFormProps {
  currentStep: number;
  formData: CarbonCalculationRequest;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const CalculatorForm = React.memo(function CalculatorForm({ currentStep, formData, handleChange }: CalculatorFormProps) {
  switch (currentStep) {
    case 0:
      return (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="transport_mode"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Primary Transport Mode
            </label>
            <select
              id="transport_mode"
              name="transport_mode"
              value={formData.transport_mode}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
            >
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
              <label
                htmlFor="transport_distance"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Daily Distance (km)
              </label>
              <input
                id="transport_distance"
                type="number"
                name="transport_distance"
                value={formData.transport_distance}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="transport_days"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Days per month
              </label>
              <input
                id="transport_days"
                type="number"
                name="transport_days"
                value={formData.transport_days}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="space-y-6">
          <div>
            <label
              htmlFor="electricity_units"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Monthly Electricity (kWh)
            </label>
            <input
              id="electricity_units"
              type="number"
              name="electricity_units"
              value={formData.electricity_units}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label
              htmlFor="food_diet"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Dietary Preference
            </label>
            <select
              id="food_diet"
              name="food_diet"
              value={formData.food_diet}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
            >
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
            <label
              htmlFor="shopping_tier"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Shopping Habit
            </label>
            <select
              id="shopping_tier"
              name="shopping_tier"
              value={formData.shopping_tier}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
            >
              <option value="low">Minimalist (Low)</option>
              <option value="medium">Average (Medium)</option>
              <option value="high">Frequent (High)</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="waste_tier"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Waste Generation
            </label>
            <select
              id="waste_tier"
              name="waste_tier"
              value={formData.waste_tier}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all"
            >
              <option value="low">Low (Recycles everything)</option>
              <option value="medium">Medium (Average)</option>
              <option value="high">High (Lots of waste)</option>
            </select>
          </div>
        </div>
      );
    default:
      return null;
  }
});
