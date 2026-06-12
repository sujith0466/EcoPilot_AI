import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Activity, Trophy, Globe, Zap, Target } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

export default function Landing() {
  return (
    <div className="flex flex-col gap-32 pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-48 pb-16 px-6 max-w-7xl mx-auto text-center">
        {/* Background gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-[100px] -z-10" />

        <FadeIn y={30}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-emerald-600 mb-8 border border-emerald-500/20 bg-emerald-50/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            EcoPilot 2.0 is now live
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={30}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Small Actions.
            <br />
            <span className="text-gradient">Global Impact.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate intelligence suite designed to monitor, analyze, and optimize your
            environmental impact. Start your journey to net-zero today.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={30}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/calculator"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              Start Tracking <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center border border-slate-200 shadow-sm"
            >
              View Dashboard
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-slate-200/50 bg-white/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
              Built for Sustainable Living
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
              <span className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <Leaf className="w-5 h-5" /> AI Powered
              </span>
              <span className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Real-time Analytics
              </span>
              <span className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <Globe className="w-5 h-5" /> Global Community
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Your Journey to Net Zero.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Everything you need to measure, understand, and reduce your carbon footprint.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Leaf,
              title: 'Smart Calculator',
              desc: 'Precision algorithms covering transport, energy, and diet.',
            },
            {
              icon: Activity,
              title: 'AI Carbon Coach',
              desc: 'Context-aware insights that adapt to your historical trends.',
            },
            {
              icon: Trophy,
              title: 'Gamified Goals',
              desc: 'Unlock milestones and build streaks to level up your ranking.',
            },
          ].map((feat, i) => (
            <FadeIn
              key={i}
              delay={i * 0.1}
              className="p-8 rounded-3xl bg-white border border-slate-200/60 shadow-premium hover:shadow-premium-hover transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feat.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-24 bg-slate-900 relative border-y border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-medium text-emerald-400 mb-8">
              <Globe className="w-4 h-4" /> Community Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
              Measuring what matters.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, val: '2.4k', label: 'Tons CO₂ Reduced' },
              { icon: Zap, val: '98%', label: 'Platform Uptime' },
              { icon: Target, val: '124', label: 'Active Goals' },
            ].map((stat, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                className="relative overflow-hidden rounded-3xl bg-slate-800/50 border border-slate-700 p-8 backdrop-blur-md"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">
                  {stat.val}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-2xl shadow-emerald-500/30 border border-emerald-400/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 tracking-tight">
              Ready to reduce your footprint?
            </h2>
            <p className="text-emerald-50 mb-8 max-w-lg mx-auto relative z-10 text-lg">
              Join thousands of users tracking, learning, and improving their environmental impact
              every single day.
            </p>
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-full font-bold hover:bg-slate-50 transition-all shadow-lg relative z-10"
            >
              Calculate Your Footprint <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
