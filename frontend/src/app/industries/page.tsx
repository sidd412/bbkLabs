import Link from 'next/link';
import { industries } from '@/data/industries';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Industries We Serve',
  description:
    'BBK Labs provides technology solutions for schools, healthcare, real estate, hotels, restaurants, manufacturing and SMEs.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Industries
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Technology Built for{' '}
              <span className="gradient-text">Your Industry</span>
            </h1>
            <p className="text-base-300 text-lg">
              We build solutions tailored to how your specific industry works.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.id} delay={i * 100}>
              <Link href={industry.href} className="block group h-full">
                <div className="glass-card p-8 h-full">
                  <span className="text-4xl mb-4 block">{industry.icon}</span>
                  <h2 className="text-2xl font-bold font-heading text-base-50 mb-3 group-hover:text-accent-start transition-colors">
                    {industry.title}
                  </h2>
                  <p className="text-base-400 leading-relaxed mb-6">{industry.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {industry.solutions.map((s) => (
                      <span key={s} className="text-xs px-3 py-1.5 bg-base-800 text-base-300 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-accent-start text-sm font-medium gap-2 group-hover:gap-3 transition-all">
                    See Industry Solutions
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
