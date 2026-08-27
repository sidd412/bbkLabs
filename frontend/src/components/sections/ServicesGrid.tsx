import Link from 'next/link';
import { services } from '@/data/services';
import ScrollReveal from '@/components/ScrollReveal';

export default function ServicesGrid() {
  return (
    <section className="section-dark py-20 lg:py-28" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              Everything Your Business Needs to{' '}
              <span className="gradient-text">Go Digital</span>
            </h2>
            <p className="text-base-300 text-lg">
              From your first website to AI-powered automation — we cover the complete technology journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 100}>
              <Link href={service.href} className="block group h-full">
                <div className="glass-card p-8 h-full flex flex-col">
                  <span className="text-3xl mb-4">{service.icon}</span>
                  <h3 className="text-xl font-semibold font-heading text-base-50 mb-3 group-hover:text-accent-start transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base-400 leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center text-accent-start text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
