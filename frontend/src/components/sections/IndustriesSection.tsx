import Link from 'next/link';
import { industries } from '@/data/industries';
import ScrollReveal from '@/components/ScrollReveal';

export default function IndustriesSection() {
  return (
    <section className="section-darker py-20 lg:py-28" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Industries We Serve
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              We Understand{' '}
              <span className="gradient-text">Your Industry</span>
            </h2>
            <p className="text-base-300 text-lg">
              We build technology tailored to how your specific industry works — not one-size-fits-all solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.id} delay={i * 100}>
              <Link href={industry.href} className="block group h-full">
                <div className="glass-card p-8 h-full">
                  <span className="text-4xl mb-4 block">{industry.icon}</span>
                  <h3 className="text-xl font-semibold font-heading text-base-50 mb-3 group-hover:text-accent-start transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-base-400 leading-relaxed mb-5">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {industry.solutions.slice(0, 4).map((solution) => (
                      <span
                        key={solution}
                        className="text-xs px-2.5 py-1 bg-base-800 text-base-300 rounded-md"
                      >
                        {solution}
                      </span>
                    ))}
                    {industry.solutions.length > 4 && (
                      <span className="text-xs px-2.5 py-1 text-accent-start">
                        +{industry.solutions.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-accent-start text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    See Solutions
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
