import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardHeader } from '../../pages/dashboard/DashboardHeader';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard Header', () => {
  it('renders correctly', () => {
    render(<BrowserRouter><DashboardHeader username="TestUser" /></BrowserRouter>);
    expect(screen.getByText(/Welcome back, TestUser/i)).toBeInTheDocument();
  });
});
