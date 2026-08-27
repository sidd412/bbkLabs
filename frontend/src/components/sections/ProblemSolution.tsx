import { problems } from '@/data/problems';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProblemSolution() {
  return (
    <section className="section-darker py-20 lg:py-28" id="problems">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Sound Familiar?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              We Solve{' '}
              <span className="gradient-text">Real Business Problems</span>
            </h2>
            <p className="text-base-300 text-lg">
              If any of these sound like your business, we can help.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-card p-8 h-full group hover:border-accent-start/30">
                <span className="text-3xl block mb-5">{item.icon}</span>
                <h3 className="text-lg font-semibold font-heading text-base-100 mb-4 leading-snug">
                  &ldquo;{item.problem}&rdquo;
                </h3>
                <div className="flex items-start gap-2">
                  <span className="text-accent-start mt-0.5">→</span>
                  <p className="text-base-400 text-sm leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Big differentiator CTA */}
        <ScrollReveal delay={400}>
          <div className="mt-16 glass-card p-10 lg:p-14 text-center max-w-3xl mx-auto glow-blue">
            <h3 className="text-2xl lg:text-3xl font-bold font-heading text-base-50 mb-4">
              Not sure what technology you need?
            </h3>
            <p className="text-base-300 text-lg mb-2">
              <strong className="text-base-100">Tell us about your business.</strong>
            </p>
            <p className="text-base-400 mb-8">
              We&apos;ll help you figure out what can actually make a difference.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              <span>Talk to Us</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
