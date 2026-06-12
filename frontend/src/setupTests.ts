import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Recharts to avoid jsdom rendering issues with SVG
vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    AreaChart: ({ children }: any) => React.createElement('div', { 'data-testid': 'area-chart' }, children),
    Area: () => React.createElement('div', { 'data-testid': 'area' }),
    XAxis: () => React.createElement('div', { 'data-testid': 'x-axis' }),
    YAxis: () => React.createElement('div', { 'data-testid': 'y-axis' }),
    CartesianGrid: () => React.createElement('div', { 'data-testid': 'cartesian-grid' }),
    Tooltip: () => React.createElement('div', { 'data-testid': 'tooltip' }),
  };
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
