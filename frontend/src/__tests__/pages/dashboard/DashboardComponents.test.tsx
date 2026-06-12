import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardStats } from '../../../../src/pages/dashboard/DashboardStats';
import { DashboardEmptyState } from '../../../../src/pages/dashboard/DashboardEmptyState';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard Components', () => {
  it('renders DashboardStats correctly', () => {
    const mockAnalytics = {
      monthly_avg: 150,
      improvement_percentage: 10,
      trend: 'down',
    };
    const mockRecord = {
      total_monthly: 100,
    } as any;
    render(<DashboardStats analytics={mockAnalytics} latestRecord={mockRecord} />);
    expect(screen.getByText('Latest Footprint')).toBeInTheDocument();
    expect(screen.getByText('100.0')).toBeInTheDocument();
  });

  it('renders DashboardEmptyState correctly', () => {
    render(<BrowserRouter><DashboardEmptyState /></BrowserRouter>);
    expect(screen.getByText(/No Tracking Data Found/i)).toBeInTheDocument();
  });
});
