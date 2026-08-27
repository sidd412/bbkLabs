import { usps } from '@/data/process';
import ScrollReveal from '@/components/ScrollReveal';

export default function WhyBBKLabs() {
  return (
    <section className="section-darker py-20 lg:py-28" id="why-bbk-labs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Why BBK Labs
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              Why Businesses{' '}
              <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-base-300 text-lg">
              We&apos;re not just another IT company. Here&apos;s what makes working with BBK Labs different.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, i) => (
            <ScrollReveal key={usp.title} delay={i * 100}>
              <div className="glass-card p-8 h-full">
                <span className="text-3xl mb-4 block">{usp.icon}</span>
                <h3 className="text-lg font-semibold font-heading text-base-50 mb-3">
                  {usp.title}
                </h3>
                <p className="text-base-400 leading-relaxed text-sm">
                  {usp.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
