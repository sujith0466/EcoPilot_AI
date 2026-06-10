import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import Calculator from './pages/Calculator';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/dashboard" element={
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        } />
      </Route>
    </Routes>
  );
}
