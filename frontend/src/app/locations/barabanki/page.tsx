import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';
import { services } from '@/data/services';

export const metadata = generateSeo({
  title: 'Technology Company in Barabanki — IT, Software, Web Development',
  description:
    'BBK Labs is a technology company in Barabanki, Uttar Pradesh offering website development, custom software, mobile apps, AI automation and digital growth solutions for local businesses.',
  path: '/locations/barabanki',
});

export default function BarabankiPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Barabanki, UP
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Technology Partner for Businesses in{' '}
              <span className="gradient-text">Barabanki</span>
            </h1>
            <p className="text-base-300 text-lg leading-relaxed">
              BBK Labs is a technology company based in Barabanki, Uttar Pradesh. We help local businesses build websites, custom software, mobile apps, AI solutions and grow their digital presence.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Services in Barabanki */}
      <section className="section-darker py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10 text-center">
              Technology Services in <span className="gradient-text">Barabanki</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 80}>
                <Link href={service.href} className="block group h-full">
                  <div className="glass-card p-7 h-full">
                    <span className="text-2xl mb-3 block">{service.icon}</span>
                    <h3 className="text-lg font-semibold text-base-50 mb-2 group-hover:text-accent-start transition-colors">
                      {service.title} in Barabanki
                    </h3>
                    <p className="text-base-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local industries */}
      <section className="section-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10 text-center">
              Businesses We Serve in <span className="gradient-text">Barabanki</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Schools & Colleges',
              'Coaching Institutes',
              'Hospitals & Clinics',
              'Dental Clinics',
              'Hotels & Restaurants',
              'Property Dealers',
              'Builders & Developers',
              'Manufacturers',
              'Distributors',
              'Salons & Spas',
              'Gyms & Fitness',
              'Retail Shops',
              'Professional Services',
              'Training Institutes',
              'Local Businesses',
            ].map((biz, i) => (
              <ScrollReveal key={biz} delay={i * 40}>
                <div className="glass-card p-4 text-center">
                  <span className="text-base-300 text-sm">{biz}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-darker py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
              Based in Barabanki? <span className="gradient-text">Let&apos;s Talk.</span>
            </h2>
            <p className="text-base-300 mb-8">
              Get a free technology audit for your business. We&apos;ll review your digital presence and share what could be better.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">
              <span>Get a Free Consultation</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
