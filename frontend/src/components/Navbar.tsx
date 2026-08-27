'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { navigation } from '@/data/navigation';
import { siteConfig } from '@/lib/config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-blur navbar-scrolled' : 'navbar-blur'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
            <span className="text-xl lg:text-2xl font-bold font-heading gradient-text">
              BBK Labs
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                    className="px-4 py-2 text-sm font-medium text-base-300 hover:text-base-50 transition-colors rounded-lg hover:bg-base-800/50 flex items-center gap-1"
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {item.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-base-300 hover:text-base-50 transition-colors rounded-lg hover:bg-base-800/50"
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-64 glass-card p-2 animate-fade-in-down">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-base-300 hover:text-base-50 hover:bg-base-700/50 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !text-sm"
              id="nav-cta"
            >
              <span>Get a Free Consultation</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-base-300 hover:text-base-50 transition-colors"
              aria-label="Toggle menu"
              id="nav-mobile-toggle"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-base-950/98 backdrop-blur-xl z-40 animate-fade-in overflow-y-auto">
          <div className="max-w-lg mx-auto px-6 py-8 space-y-2">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-3 text-lg font-medium text-base-200 hover:text-base-50"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 space-y-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2.5 text-base-400 hover:text-base-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-lg font-medium text-base-200 hover:text-base-50"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-6 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center btn-primary"
              >
                <span>Get a Free Consultation</span>
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center btn-whatsapp"
                onClick={() => setMobileOpen(false)}
              >
                Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
