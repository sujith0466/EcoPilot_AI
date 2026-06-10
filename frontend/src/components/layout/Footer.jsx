import { Link } from 'react-router-dom';
import { Leaf, GitFork, Globe, ArrowUpRight, ExternalLink } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Carbon Calculator', to: '/calculator', internal: true },
    { label: 'Intelligence Dashboard', to: '/dashboard', internal: true },
    { label: 'AI Carbon Coach', to: '/dashboard', internal: true },
  ],
  Developers: [
    { label: 'API Reference', href: '#', internal: false },
    { label: 'GitHub Repository', href: 'https://github.com', internal: false },
    { label: 'PromptWars Submission', href: '#', internal: false },
  ],
  Company: [
    { label: 'About', href: '#', internal: false },
    { label: 'Open Source', href: 'https://github.com', internal: false },
    { label: 'License (MIT)', href: '#', internal: false },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">EcoPilot</span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              An AI-powered climate intelligence platform for measuring, tracking, and reducing your carbon footprint.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all"
              >
              <GitFork className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all"
              >
              <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="md:col-span-2 flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        to={link.to}
                        className="text-sm text-slate-400 hover:text-slate-100 transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="text-sm text-slate-400 hover:text-slate-100 transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.href.startsWith('http') && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} EcoPilot. Open-source under the{' '}
            <a href="#" className="hover:text-slate-300 underline underline-offset-2 transition-colors">
              MIT License
            </a>.
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
