import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CalculatorForm } from '../../../../src/pages/calculator/CalculatorForm';
import { CalculatorSummary } from '../../../../src/pages/calculator/CalculatorSummary';

describe('Calculator Components', () => {
  it('renders CalculatorForm at step 0', () => {
    const mockFormData = {
      transport_mode: 'car',
      transport_distance: 10,
      transport_days: 20,
      electricity_units: 100,
      food_diet: 'mixed',
      shopping_tier: 'medium',
      waste_tier: 'medium',
    };
    const mockHandleChange = vi.fn();
    
    render(<CalculatorForm currentStep={0} formData={mockFormData as any} handleChange={mockHandleChange} />);
    
    expect(screen.getByLabelText(/Primary Transport Mode/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('car');
  });

  it('triggers handleChange in CalculatorForm', () => {
    const mockFormData = {
      transport_mode: 'car',
      transport_distance: 10,
      transport_days: 20,
      electricity_units: 100,
      food_diet: 'mixed',
      shopping_tier: 'medium',
      waste_tier: 'medium',
    };
    const mockHandleChange = vi.fn();
    
    render(<CalculatorForm currentStep={0} formData={mockFormData as any} handleChange={mockHandleChange} />);
    
    const input = screen.getByLabelText(/Daily Distance/i);
    fireEvent.change(input, { target: { value: '15' } });
    
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('renders CalculatorSummary correctly', () => {
    render(<CalculatorSummary currentStep={1} />);
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Home & Diet')).toBeInTheDocument();
  });
});
