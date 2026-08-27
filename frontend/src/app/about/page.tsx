import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'About BBK Labs',
  description:
    'BBK Labs is a modern technology company starting from Barabanki, helping businesses use technology to work smarter and grow faster.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Building Technology from{' '}
              <span className="gradient-text">Barabanki</span>
            </h1>
            <p className="text-base-300 text-lg leading-relaxed">
              We&apos;re building a technology company that helps businesses use technology practically — not just as a buzzword, but as a real tool for growth.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Story */}
      <section className="section-darker py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            <ScrollReveal>
              <div className="glass-card p-8 lg:p-12">
                <h2 className="text-2xl font-bold font-heading mb-6">Why BBK Labs Exists</h2>
                <div className="space-y-4 text-base-300 leading-relaxed">
                  <p>
                    Most businesses in growing cities like Barabanki know they need technology — a website, better systems, a way to manage enquiries — but they don&apos;t always know where to start or who to trust.
                  </p>
                  <p>
                    BBK Labs exists to bridge that gap. We&apos;re a technology company that starts by understanding your business, then recommends what actually makes sense. No unnecessary products. No confusing jargon. Just practical solutions.
                  </p>
                  <p>
                    Whether you need a simple website or a complete business management system with AI automation, we build it with the same care and quality.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="glass-card p-8 lg:p-12">
                <h2 className="text-2xl font-bold font-heading mb-6">Our Approach</h2>
                <div className="space-y-4 text-base-300 leading-relaxed">
                  <p>
                    <strong className="text-base-100">Business first, technology second.</strong> We don&apos;t start with code — we start with a conversation. What does your business do? What&apos;s working? What&apos;s not? What do you wish was easier?
                  </p>
                  <p>
                    Once we understand the real problem, we design a solution that fits. Sometimes that&apos;s a website. Sometimes it&apos;s custom software. Sometimes it&apos;s automation that saves hours of manual work every day.
                  </p>
                  <p>
                    And we explain everything in plain language. You should never need a computer science degree to work with your technology partner.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card p-8 lg:p-12">
                <h2 className="text-2xl font-bold font-heading mb-6">Our Vision</h2>
                <div className="space-y-4 text-base-300 leading-relaxed">
                  <p>
                    We&apos;re starting in Barabanki because we believe quality technology should be accessible everywhere — not just in metros.
                  </p>
                  <p>
                    But we&apos;re not stopping here. Our vision is to grow into a technology company that serves businesses across Uttar Pradesh and eventually all of India — the same way, with the same care, one business at a time.
                  </p>
                  <p className="text-base-100 font-medium">
                    Barabanki → Ayodhya → Lucknow → Uttar Pradesh → India
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="glass-card p-8 lg:p-12">
                <h2 className="text-2xl font-bold font-heading mb-6">What We Believe</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Understand before building', desc: 'Technology should solve a real problem, not create new ones.' },
                    { title: 'Simple communication', desc: 'If the customer can\'t understand it, we haven\'t explained it well enough.' },
                    { title: 'Quality over quantity', desc: 'We\'d rather do fewer projects exceptionally well than many projects poorly.' },
                    { title: 'Long-term relationships', desc: 'We\'re here to be your technology partner, not just a one-time vendor.' },
                  ].map((belief) => (
                    <div key={belief.title}>
                      <h3 className="text-base-100 font-semibold mb-2">{belief.title}</h3>
                      <p className="text-base-400 text-sm leading-relaxed">{belief.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
              Let&apos;s Build Something <span className="gradient-text">Together</span>
            </h2>
            <p className="text-base-300 mb-8">
              Whether you&apos;re a school, a hospital, a hotel or a growing business — we&apos;d love to hear what you&apos;re trying to achieve.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">
              <span>Talk to Us</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
