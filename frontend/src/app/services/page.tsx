import Link from 'next/link';
import { services } from '@/data/services';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Our Services',
  description:
    'BBK Labs offers website development, business software, mobile apps, AI automation, digital growth and ongoing support for businesses.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Technology Solutions for{' '}
              <span className="gradient-text">Every Business Need</span>
            </h1>
            <p className="text-base-300 text-lg leading-relaxed">
              From a simple website to complex AI automation — we help businesses at every stage of their digital journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 100}>
              <Link href={service.href} className="block group h-full">
                <div className="glass-card p-8 h-full flex flex-col">
                  <span className="text-4xl mb-5">{service.icon}</span>
                  <h2 className="text-xl font-bold font-heading text-base-50 mb-3 group-hover:text-accent-start transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-base-400 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 5).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-base-300">
                        <span className="text-accent-start text-xs">✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-accent-start text-sm font-medium gap-2 group-hover:gap-3 transition-all mt-auto">
                    View Details & Pricing
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
