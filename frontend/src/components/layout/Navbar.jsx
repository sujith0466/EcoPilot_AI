import { Link, useLocation } from 'react-router-dom';
import { Leaf, Moon, Globe } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'glass-panel border-b border-slate-200/50 py-3' : 'bg-transparent py-5'
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-emerald-100/50 group-hover:bg-emerald-100 transition-colors">
            <Leaf className="w-5 h-5 text-emerald-600 drop-shadow-sm" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            EcoPilot
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { path: '/', label: 'Home' },
            { path: '/calculator', label: 'Calculator' },
            { path: '/dashboard', label: 'Dashboard' }
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'text-sm font-medium transition-colors',
                location.pathname === item.path 
                  ? 'text-emerald-600' 
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
            <Moon className="w-4 h-4" />
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 hidden sm:block">
            <Globe className="w-4 h-4" />
          </a>
          <Link 
            to="/dashboard" 
            className="hidden md:flex items-center justify-center bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md"
          >
            Open Dashboard
          </Link>
        </div>

      </div>
    </header>
  );
}
