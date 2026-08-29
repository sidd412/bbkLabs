import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';
import CaseStudiesList from '@/components/sections/CaseStudiesList';

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

        <CaseStudiesList />
      </section>
    </div>
  );
}
