import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CalculatorResults } from '../../pages/calculator/CalculatorResults';
import { DashboardChart } from '../../pages/dashboard/DashboardChart';

describe('Calculator Results', () => {
  it('renders results properly', () => {
    const mockResult = {
      total_monthly: 200,
      carbon_score: 80,
      impact_level: 'High',
      breakdown: { transport: 100, electricity: 50, food: 30, shopping: 20 },
      ai_coaching: 'Reduce car travel.',
    };
    render(<CalculatorResults result={mockResult as any} handleRecalculate={() => {}} />);
    expect(screen.getByText('200.0')).toBeInTheDocument();
  });
});

describe('Dashboard Chart', () => {
  it('renders chart without crashing', () => {
    const mockHistory = [
      { total_monthly: 100, record_month: 1, record_year: 2026, calculated_at: '2026-01-01T00:00:00' },
      { total_monthly: 150, record_month: 2, record_year: 2026, calculated_at: '2026-02-01T00:00:00' },
    ];
    render(<DashboardChart history={mockHistory as any} />);
    expect(screen.getByText('Emission Trends')).toBeInTheDocument();
  });
});
