import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Send, Check, ShieldCheck, Cpu, Layers, X, Phone, Mail } from 'lucide-react';
import { FloatingOrbs } from './components/FloatingOrbs';

const API_URL = 'https://bucle-3d-backend.vercel.app';

export default function App(): React.JSX.Element {
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = contactOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [contactOpen]);

  const springConfig = { type: 'spring', bounce: 0, duration: 0.6 };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subscribing) return;
    setSubscribing(true);
    setSubscribeError('');
    try {
      const res = await fetch(`${API_URL}/api/newsletter/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail =
          typeof data?.detail === 'string'
            ? data.detail
            : ((data?.detail && data.detail.email) as string) || 'Something went wrong. Please try again.';
        throw new Error(detail);
      }
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setSubscribeError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactSubmitting) return;
    setContactSubmitting(true);
    setContactError('');
    try {
      const res = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const err = data?.detail;
        const msg =
          typeof err === 'string'
            ? err
            : err?.email?.[0] ?? err?.name?.[0] ?? 'Something went wrong. Please try again.';
        throw new Error(msg);
      }
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      setContactError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FBFBFA] text-[#0F0F11] min-h-screen selection:bg-[#0A192F] selection:text-white relative overflow-hidden font-sans m-0 p-0">
      <FloatingOrbs />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-[#0A192F]/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* ── Contact Modal ── */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => { setContactOpen(false); setContactSubmitted(false); }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={springConfig}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-10 z-10"
            >
              <button
                onClick={() => { setContactOpen(false); setContactSubmitted(false); }}
                className="absolute top-5 right-5 text-black/30 hover:text-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {contactSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F0F11] mb-2">We'll be in touch.</h3>
                  <p className="text-sm text-black/50">Expect a callback within one business day.</p>
                </div>
              ) : (
                <>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#0A192F]/50 block mb-2">Get in touch</span>
                  <h3 className="text-2xl font-semibold text-[#0F0F11] mb-1">Request a callback</h3>
                  <p className="text-sm text-black/50 mb-7">Fill in your details and we'll call you back to discuss your project.</p>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-black/40 uppercase tracking-widest block mb-1.5">Name *</label>
                        <input
                          required type="text" placeholder="Your name"
                          value={contactForm.name}
                          onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full border border-[#0A192F]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A192F]/40 transition-colors bg-[#FBFBFA]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-black/40 uppercase tracking-widest block mb-1.5">Company</label>
                        <input
                          type="text" placeholder="Your company"
                          value={contactForm.company}
                          onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))}
                          className="w-full border border-[#0A192F]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A192F]/40 transition-colors bg-[#FBFBFA]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-black/40 uppercase tracking-widest block mb-1.5">Email *</label>
                      <input
                        required type="email" placeholder="you@company.com"
                        value={contactForm.email}
                        onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full border border-[#0A192F]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A192F]/40 transition-colors bg-[#FBFBFA]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-black/40 uppercase tracking-widest block mb-1.5">Phone (with country code)*</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30" />
                        <input
                          required type="tel" placeholder="+971 12345 67890"
                          value={contactForm.phone}
                          onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full border border-[#0A192F]/15 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#0A192F]/40 transition-colors bg-[#FBFBFA]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-black/40 uppercase tracking-widest block mb-1.5">What are you building?</label>
                      <textarea
                        rows={3} placeholder="Brief description of your project..."
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full border border-[#0A192F]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#0A192F]/40 transition-colors bg-[#FBFBFA] resize-none"
                      />
                    </div>
                    {contactError && (
                      <p className="text-xs text-red-600 text-center">{contactError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-[#0A192F] text-white text-xs font-bold py-3.5 rounded-full hover:bg-[#112240] transition-colors shadow-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {contactSubmitting ? 'Sending…' : 'Request Callback'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-8 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-md border-b border-[#0A192F]/10 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ height: scrolled ? '72px' : '88px' }}
      >
        <div className="w-full h-full flex items-center justify-between max-w-7xl mx-auto">
          {/* LOGO */}
          <div className="flex items-center">
            <img
              src="logo.png"
              alt="Bucle Logo"
              className="block h-[30px] w-[100px] object-contain"
            />
            <span className="ml-4 text-[11px] font-mono text-[#0A192F]/60 tracking-widest uppercase font-semibold">
              By Zeens
            </span>
          </div>

          {/* NAV */}
          <nav className="px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-[#0A192F]/10 shadow-sm flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#0F0F11]/80 tracking-tight">
              <a href="#about" className="hover:text-[#0A192F] transition-colors">About</a>
              <a href="#capabilities" className="hover:text-[#0A192F] transition-colors">Capabilities</a>
              <a href="#dispatch" className="hover:text-[#0A192F] transition-colors">Dispatch</a>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setContactOpen(true)}
              className="bg-[#0A192F] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#112240] transition-colors shadow-sm"
            >
              Contact
            </motion.button>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-48 pb-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-2.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#0A192F]/70 font-semibold">
            Founded 2026 | Abu Dhabi, uae
          </span>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-[0.93] text-[#0F0F11] mb-8"
        >
          Engineered <br />
          <span className="italic font-normal text-[#0A192F]/40">perfection.</span>
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-[#0A192F]/10 pt-8">
          <p className="md:col-span-7 text-lg md:text-xl text-black/70 font-light leading-relaxed">
            Bucle designs and builds bespoke web applications, fluid motion systems, and high-performance digital platforms for brands that demand luxury-grade precision.
          </p>
          <div className="md:col-span-5 flex justify-start md:justify-end gap-4">
            <a href="#about" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0A192F] hover:text-[#112240] border-b border-[#0A192F]/40 pb-1 font-bold">
              Read Studio Manifesto <ArrowUpRight className="w-4 h-4 text-[#0A192F]" />
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 px-6 max-w-6xl mx-auto border-t border-[#0A192F]/10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight text-[#0F0F11] leading-snug">
              We eliminate the gap between design vision and technical execution.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-black/70 font-normal leading-relaxed text-base">
            <p>
              Most digital products are built to ship, not to last. Bucle was founded on a different premise — that engineering and design are inseparable disciplines, and that the best digital experiences are the ones users never have to think about. They just work, instantly, beautifully, every time.
            </p>
            <p>
              We operate as an elite engineering lab for founders and brands who refuse to settle. Our process is rigorous: we audit your problem space before writing a single line of code, identify the architectural decisions that compound over time, and build systems that scale without accumulating technical debt.
            </p>
            <p>
              From early-stage startups carving out a market position to established enterprises modernising legacy infrastructure, Bucle partners with organisations at every stage of ambition. What unites our clients is a shared belief: that world-class software is a strategic advantage, not a commodity.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#0A192F]/10 mt-4">
              {[
                { num: '< 48h', label: 'Response time' },
                { num: '100%', label: 'Client retention' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-semibold text-[#0F0F11] tracking-tight">{s.num}</p>
                  <p className="text-xs text-black/40 font-mono uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#0A192F]/10 relative z-10">
        <h3 className="text-3xl font-semibold text-[#0F0F11] mb-4">Crafted for impact.</h3>
        <p className="text-base text-black/50 font-light mb-12 max-w-2xl">
          End-to-end technology solutions engineered for performance, scale, and longevity. We don't hand off — we own the outcome alongside you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Cpu className="w-5 h-5 text-[#0A192F]" />,
              title: "Web Engineering",
              desc: "React, Next.js, and Python backends built with clean modular architecture. We obsess over Core Web Vitals, bundle size, and render performance — because speed is a feature your users feel immediately.",
            },
            {
              icon: <Layers className="w-5 h-5 text-[#0A192F]" />,
              title: "Fluid Motion & UI",
              desc: "Apple-inspired spring physics, gestural interfaces, and micro-interactions that elevate your product from functional to memorable. Every transition is intentional, every animation earns its place.",
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#0A192F]" />,
              title: "System Architecture",
              desc: "High-throughput database design, security-first API layers, and optimised cloud deployments on AWS, Vercel, and GCP. We build infrastructure that sleeps well at 3am.",
            },
            {
              icon: <ArrowUpRight className="w-5 h-5 text-[#0A192F]" />,
              title: "Mobile Applications",
              desc: "Native and cross-platform mobile apps using React Native and Expo. Consistent performance and intuitive UX across iOS and Android — no compromises on either platform.",
            },
            {
              icon: <Cpu className="w-5 h-5 text-[#0A192F]" />,
              title: "AI Integration",
              desc: "Intelligent automation, predictive analytics, and LLM-powered features woven into your product. We turn raw data into workflows that think — so your team can focus on what matters.",
            },
            {
              icon: <Layers className="w-5 h-5 text-[#0A192F]" />,
              title: "SaaS Platforms",
              desc: "Custom enterprise software and cloud-native SaaS architectures designed from day one for multi-tenancy, scale, and reliability. From MVP to Series B infrastructure — we've done it before.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-[#0A192F]/10 shadow-sm flex flex-col justify-between hover:border-[#0A192F]/30 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#0A192F]/5 flex items-center justify-center mb-6 group-hover:bg-[#0A192F] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-[#0F0F11]">{item.title}</h4>
                <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-8 flex justify-end">
                <ArrowUpRight className="w-4 h-4 text-[#0A192F]/40 group-hover:text-[#0A192F] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="dispatch" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <div className="rounded-3xl bg-[#0A192F] text-white p-8 md:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-xl relative z-10">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Insights on engineering, motion & editorial design.
            </h3>
            <p className="text-sm text-white/70 mb-8 font-normal">
              Join founders and developers receiving our concise breakdowns on web performance, clean code, and UI physics.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email" required placeholder="Enter your email address"
                value={email}
                disabled={subscribed || subscribing}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors flex-1 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribed || subscribing}
                className="bg-white text-[#0A192F] text-xs font-bold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {subscribed ? (
                  <><Check className="w-4 h-4 text-emerald-600" /> Subscribed</>
                ) : subscribing ? (
                  <>Subscribing…</>
                ) : (
                  <>Subscribe <Send className="w-3.5 h-3.5" /></>
                )}
              </button>
            </form>
            {subscribeError && (
              <p className="text-xs text-red-400 mt-3">{subscribeError}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0D1B2A] pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div className="space-y-4">
              <img
                src="/logo_footer.png"
                alt="Bucle"
                style={{ height: '30px' }}
                className="w-auto object-contain"
              />
              <p className="text-white/40 text-xs font-sans leading-relaxed">
                Bespoke web applications and high-performance digital systems.
              </p>
            </div>
            <div>
              <span className="text-white/30 font-bold uppercase tracking-widest block mb-4 text-xs font-mono">Navigation</span>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="#about" className="text-white/50 hover:text-white transition-colors">About</a></li>
                <li><a href="#capabilities" className="text-white/50 hover:text-white transition-colors">Capabilities</a></li>
                <li><a href="#dispatch" className="text-white/50 hover:text-white transition-colors">Dispatch</a></li>
              </ul>
            </div>
            <div>
              <span className="text-white/30 font-bold uppercase tracking-widest block mb-4 text-xs font-mono">Socials</span>
              <ul className="space-y-3 text-xs font-mono text-white/50">
                <li>
                  <a 
                    href="https://www.instagram.com/buclebyzeens/?utm_source=ig_web_button_share_sheet" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    @buclebyzeens
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:buclebyzeens@gmail.com" 
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    buclebyzeens@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 gap-4 text-xs font-mono">
            <p className="text-white/30">© {new Date().getFullYear()} Bucle Inc. All rights reserved.</p>
            <p className="text-white/20">High-Precision Digital Engineering.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}