'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="glow-spot w-[600px] h-[600px] bg-accent-start -top-40 -right-40" />
      <div className="glow-spot w-[400px] h-[400px] bg-accent-end -bottom-20 -left-20" />
      <div className="glow-spot w-[300px] h-[300px] bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Service Labels */}
            <div className="flex flex-wrap gap-2">
              {['Websites', 'Software', 'Apps', 'AI', 'Automation'].map((label, i) => (
                <span
                  key={label}
                  className="px-3 py-1 text-xs font-medium text-accent-start bg-accent-start/10 rounded-full border border-accent-start/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
              <span>🚀</span>
              Technology Solutions for Businesses in Barabanki
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-[1.1] tracking-tight">
                <span className="text-base-50">Your Business.</span>
                <br />
                <span className="gradient-text">Our Technology.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-base-300 max-w-xl leading-relaxed">
              We build practical technology solutions that help businesses work smarter, reach more customers, and grow. Starting in Barabanki, serving businesses with bigger ambitions.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-base-400 font-medium">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Transparent Pricing
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Local Support
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Business First Approach
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-center" id="hero-cta-primary">
                <span>Get a Free Consultation</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-center"
                id="hero-cta-whatsapp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Talk on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right - Ecosystem Visual */}
          <div className={`hidden lg:block ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center shadow-2xl shadow-accent-start/20 z-10">
                <div className="text-center">
                  <span className="text-2xl">💼</span>
                  <p className="text-white text-xs font-bold mt-1">Your Business</p>
                </div>
              </div>

              {/* Orbiting nodes */}
              {[
                { icon: '🌐', label: 'Website', angle: 0, delay: 0 },
                { icon: '📊', label: 'Leads', angle: 60, delay: 1 },
                { icon: '⚙️', label: 'Software', angle: 120, delay: 2 },
                { icon: '📱', label: 'App', angle: 180, delay: 3 },
                { icon: '🤖', label: 'AI', angle: 240, delay: 4 },
                { icon: '🚀', label: 'Growth', angle: 300, delay: 5 },
              ].map((node) => {
                const radius = 160;
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <div
                    key={node.label}
                    className="ecosystem-node absolute w-20 h-20 rounded-xl glass-card flex flex-col items-center justify-center z-10"
                    style={{
                      top: `calc(50% + ${y}px - 40px)`,
                      left: `calc(50% + ${x}px - 40px)`,
                      animationDelay: `${-node.delay}s`,
                    }}
                  >
                    <span className="text-lg">{node.icon}</span>
                    <span className="text-base-300 text-[10px] font-medium mt-1">{node.label}</span>
                  </div>
                );
              })}

              {/* Connection lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.3)" />
                  </linearGradient>
                </defs>
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 200 + Math.cos(rad) * 160;
                  const y = 200 + Math.sin(rad) * 160;
                  return (
                    <line
                      key={angle}
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      className="ecosystem-line"
                    />
                  );
                })}
              </svg>

              {/* Subtle ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-base-700/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-950 to-transparent" />
    </section>
  );
}
