import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { services } from '@/data/services';
import { industries } from '@/data/industries';

export default function Footer() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <footer className="bg-base-900 border-t border-base-800/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold font-heading gradient-text">BBK Labs</span>
            </Link>
            <p className="text-base-400 text-sm leading-relaxed mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-base-400 text-sm leading-relaxed mb-6">
              Technology solutions that help businesses work smarter, grow faster and stay connected with their customers.
            </p>
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-base-800 text-base-400 hover:text-base-50 hover:bg-base-700 transition-all text-xs uppercase"
                  aria-label={platform}
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base-100 font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-base-400 hover:text-base-100 transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-base-100 font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    href={industry.href}
                    className="text-base-400 hover:text-base-100 transition-colors text-sm"
                  >
                    {industry.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/industries"
                  className="text-accent-start hover:text-accent-end transition-colors text-sm font-medium"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base-100 font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <span>💬</span> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-base-400 hover:text-base-100 transition-colors text-sm flex items-center gap-2"
                >
                  <span>📞</span> {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-base-400 hover:text-base-100 transition-colors text-sm flex items-center gap-2"
                >
                  <span>✉️</span> {siteConfig.contact.email}
                </a>
              </li>
              <li className="text-base-400 text-sm flex items-center gap-2">
                <span>📍</span> {siteConfig.contact.address}
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-base-800/50">
              <h4 className="text-base-300 text-xs uppercase tracking-wider mb-2">Business Hours</h4>
              <p className="text-base-400 text-sm">Mon–Fri: {siteConfig.businessHours.weekdays}</p>
              <p className="text-base-400 text-sm">Sat: {siteConfig.businessHours.saturday}</p>
              <p className="text-base-400 text-sm">Sun: {siteConfig.businessHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base-500 text-sm">
            © {new Date().getFullYear()} BBK Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-base-500 hover:text-base-300 text-sm transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-base-500 hover:text-base-300 text-sm transition-colors">
              Contact
            </Link>
            <Link href="/resources" className="text-base-500 hover:text-base-300 text-sm transition-colors">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
