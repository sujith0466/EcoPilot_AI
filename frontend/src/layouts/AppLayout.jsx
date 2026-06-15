import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-50 focus-visible:p-4 focus-visible:bg-white focus-visible:text-slate-900 focus-visible:font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-24 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
