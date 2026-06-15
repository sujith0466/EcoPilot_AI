import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDashboardData } from '../../hooks/useDashboardData';
import * as api from '../../services/api';

vi.mock('../../services/api', () => ({
  getDashboardData: vi.fn(),
}));

describe('useDashboardData Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches dashboard data successfully', async () => {
    const mockData = {
      username: 'TestUser',
      history: [],
      analytics: { monthly_avg: 100, trend: 'stable' },
      ai_coach: 'Keep going!',
      gamification: { level: 1, streak_days: 5, achievements: [] },
      latest_record: null,
      recommendations: [],
    };
    (api.getDashboardData as any).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles API errors', async () => {
    (api.getDashboardData as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect((result.current.error as Error).message).toBe('Network error');
  });
});
