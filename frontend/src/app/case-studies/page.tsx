import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Case Studies',
  description:
    'See how BBK Labs has helped businesses with technology solutions. Real projects, real results.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Case Studies
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Real Projects.{' '}
              <span className="gradient-text">Real Results.</span>
            </h1>
            <p className="text-base-300 text-lg">
              See how we&apos;ve helped businesses solve real problems with practical technology.
            </p>
          </div>
        </ScrollReveal>

        {/* Coming Soon State */}
        <ScrollReveal delay={200}>
          <div className="max-w-xl mx-auto glass-card p-12 text-center">
            <span className="text-5xl block mb-6">🔨</span>
            <h2 className="text-2xl font-bold font-heading mb-4">Coming Soon</h2>
            <p className="text-base-400 leading-relaxed mb-6">
              We&apos;re currently working on our first projects. Once they&apos;re complete, we&apos;ll share the full story here — the challenge, our approach, what we built and the results.
            </p>
            <p className="text-base-500 text-sm mb-8">
              Only genuine projects. No invented case studies.
            </p>
            <Link href="/contact" className="btn-primary inline-flex">
              <span>Start a Project With Us</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
