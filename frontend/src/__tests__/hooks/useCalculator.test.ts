import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCalculator } from '../../../src/hooks/useCalculator';
import * as api from '../../../src/services/api';

vi.mock('../../../src/services/api', () => ({
  calculateFootprint: vi.fn(),
}));

describe('useCalculator Hook', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.currentStep).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.formData.transport_mode).toBe('car');
  });

  it('updates form data', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      const e = { target: { name: 'transport_distance', value: '50' } } as any;
      result.current.handleChange(e);
    });
    expect(result.current.formData.transport_distance).toBe('50');
  });

  it('handles next and prev steps', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNext();
    });
    expect(result.current.currentStep).toBe(1);
    
    act(() => {
      result.current.handlePrev();
    });
    expect(result.current.currentStep).toBe(0);
  });

  it('handles calculation submission', async () => {
    const mockResponse = { data: { total_monthly: 100, carbon_score: 95, impact_level: 'Low', breakdown: {}, ai_coaching: 'Great job!' } };
    (api.calculateFootprint as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCalculator());
    
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.result).toEqual(mockResponse.data);
  });
});
