import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { calculateFootprint } from '../services/api';
import type { CarbonCalculationRequest, CarbonCalculationResponse } from '../types';



export function useCalculator() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CarbonCalculationResponse | null>(null);

  const [formData, setFormData] = useState<CarbonCalculationRequest>({
    transport_mode: 'car',
    transport_distance: 15,
    transport_days: 30,
    electricity_units: 200,
    food_diet: 'mixed',
    shopping_tier: 'medium',
    waste_tier: 'medium',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleNext = useCallback(() => setCurrentStep((prev) => Math.min(prev + 1, 3 - 1)), []);
  const handlePrev = useCallback(() => setCurrentStep((prev) => Math.max(prev - 1, 0)), []);
  const handleRecalculate = useCallback(() => setResult(null), []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await calculateFootprint(formData);
      setResult(response.data);
      toast.success('Calculation complete!');
    } catch {
      toast.error('Failed to calculate footprint');
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return {
    currentStep,
    loading,
    result,
    formData,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    handleRecalculate,
  };
}
