import { processSteps } from '@/data/process';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProcessSteps() {
  return (
    <section className="section-dark py-20 lg:py-28" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              A Simple Process That{' '}
              <span className="gradient-text">Actually Works</span>
            </h2>
            <p className="text-base-300 text-lg">
              No confusing proposals or technical jargon. Just a clear path from understanding your problem to delivering the solution.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 150}>
              <div className="relative h-full">
                <div className="glass-card p-8 h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-accent-start/20 to-accent-end/20 flex items-center justify-center mb-5">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="text-accent-start text-sm font-bold mb-2">
                    Step {step.step}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-base-50 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connector */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 text-base-600">
                    →
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
