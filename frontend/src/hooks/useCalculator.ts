import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { calculateFootprint } from '../services/api';
import type { CarbonCalculationRequest, CarbonCalculationResponse } from '../types';

const calculatorSchema = z.object({
  transport_mode: z.enum(['car', 'motorcycle', 'bus', 'train', 'bicycle', 'walking']),
  transport_distance: z.number().min(0, 'Distance must be at least 0').max(100000, 'Distance is unusually high'),
  transport_days: z.number().min(0, 'Days cannot be negative').max(31, 'Days cannot exceed 31'),
  electricity_units: z.number().min(0, 'Electricity units cannot be negative'),
  food_diet: z.enum(['non-vegetarian', 'mixed', 'vegetarian']),
  shopping_tier: z.enum(['low', 'medium', 'high']),
  waste_tier: z.enum(['low', 'medium', 'high']),
});

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
    setFormData((prev) => ({ 
      ...prev, 
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value 
    }));
  }, []);

  const handleNext = useCallback(() => setCurrentStep((prev) => Math.min(prev + 1, 3 - 1)), []);
  const handlePrev = useCallback(() => setCurrentStep((prev) => Math.max(prev - 1, 0)), []);
  const handleRecalculate = useCallback(() => setResult(null), []);

  const handleSubmit = useCallback(async () => {
    const validation = calculatorSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

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
