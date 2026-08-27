import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Resources & Blog',
  description:
    'Useful articles, guides and insights about technology, digital growth and business solutions from BBK Labs.',
  path: '/resources',
});

export default function ResourcesPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Resources
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Useful Guides &{' '}
              <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-base-300 text-lg">
              Practical articles about technology, digital growth and business solutions — written in plain language.
            </p>
          </div>
        </ScrollReveal>

        {/* Coming Soon */}
        <ScrollReveal delay={200}>
          <div className="max-w-xl mx-auto glass-card p-12 text-center">
            <span className="text-5xl block mb-6">📝</span>
            <h2 className="text-2xl font-bold font-heading mb-4">Coming Soon</h2>
            <p className="text-base-400 leading-relaxed mb-6">
              We&apos;re preparing genuinely useful content about technology, digital growth and practical business solutions. No SEO spam — just real, helpful articles.
            </p>
            <p className="text-base-500 text-sm mb-4">Topics we&apos;ll cover:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                'Website costs',
                'Google Business',
                'Local SEO',
                'WhatsApp automation',
                'School technology',
                'Business software',
                'AI for local businesses',
              ].map((topic) => (
                <span key={topic} className="text-xs px-3 py-1.5 bg-base-800 text-base-300 rounded-lg">
                  {topic}
                </span>
              ))}
            </div>
            <Link href="/contact" className="btn-primary inline-flex">
              <span>Get Notified</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
