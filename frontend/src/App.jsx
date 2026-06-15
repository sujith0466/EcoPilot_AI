import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

const Calculator = lazy(() => import('./pages/Calculator'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/calculator" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Calculator />
            </Suspense>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
}
