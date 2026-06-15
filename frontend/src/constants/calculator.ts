import { Car, Home, Leaf } from 'lucide-react';
import type { CarbonCalculationRequest } from '../types';

export const CALCULATOR_STEPS = [
  { id: 'transport', title: 'Transport', icon: Car },
  { id: 'home', title: 'Home & Diet', icon: Home },
  { id: 'lifestyle', title: 'Lifestyle', icon: Leaf },
];

export const INITIAL_FORM_DATA: CarbonCalculationRequest = {
  transport_mode: 'car',
  transport_distance: 15,
  transport_days: 30,
  electricity_units: 200,
  food_diet: 'mixed',
  shopping_tier: 'medium',
  waste_tier: 'medium',
};
