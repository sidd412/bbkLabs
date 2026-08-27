import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, getServiceBySlug } from '@/data/services';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return generateSeo({
    title: service.title,
    description: service.longDescription.slice(0, 160),
    path: service.href,
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({ name: service.title, description: service.longDescription, url: service.href })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: service.href },
          ])),
        }}
      />

      <div className="pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Link href="/services" className="text-accent-start text-sm font-medium hover:underline mb-4 inline-block">
                ← All Services
              </Link>
              <div className="text-5xl mb-4">{service.icon}</div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                {service.title}
              </h1>
              <p className="text-base-300 text-lg leading-relaxed">
                {service.longDescription}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Features */}
        <section className="section-darker py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
                What&apos;s <span className="gradient-text">Included</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, i) => (
                <ScrollReveal key={feature} delay={i * 50}>
                  <div className="flex items-center gap-3 p-4 glass-card">
                    <span className="text-accent-start">✓</span>
                    <span className="text-base-200 text-sm">{feature}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
                  Pricing <span className="gradient-text">Plans</span>
                </h2>
                <p className="text-base-400">
                  Every business is different. These are starting points — we&apos;ll give you a custom quote.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.pricing.map((tier, i) => (
                <ScrollReveal key={tier.name} delay={i * 100}>
                  <div
                    className={`glass-card p-7 h-full flex flex-col ${
                      tier.highlighted ? 'border-accent-start/30 glow-blue' : ''
                    }`}
                  >
                    {tier.highlighted && (
                      <span className="text-xs font-semibold text-accent-start uppercase tracking-wider mb-3">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-lg font-bold font-heading text-base-50 mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-2xl font-bold font-heading gradient-text mb-3">
                      {tier.price}
                    </p>
                    <p className="text-base-400 text-sm mb-5">{tier.description}</p>
                    <ul className="space-y-2 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="text-sm text-base-300 flex items-center gap-2">
                          <span className="text-accent-start text-xs">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`mt-6 text-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                        tier.highlighted
                          ? 'btn-primary !py-2.5 w-full justify-center'
                          : 'btn-secondary !py-2.5 w-full justify-center'
                      }`}
                    >
                      <span>Get Started</span>
                    </Link>
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
                Ready to Get Started?
              </h2>
              <p className="text-base-300 mb-8">
                Tell us about your business and we&apos;ll recommend the best {service.shortTitle.toLowerCase()} solution for you.
              </p>
              <Link href="/contact" className="btn-primary inline-flex">
                <span>Tell Us About Your Business</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
