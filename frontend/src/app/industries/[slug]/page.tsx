import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industries, getIndustryBySlug } from '@/data/industries';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return generateSeo({
    title: `${industry.title} — Technology Solutions`,
    description: industry.description,
    path: industry.href,
  });
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Industries', url: '/industries' },
            { name: industry.title, url: industry.href },
          ])),
        }}
      />

      <div className="pt-24 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <ScrollReveal>
            <div className="max-w-3xl">
              <Link href="/industries" className="text-accent-start text-sm font-medium hover:underline mb-4 inline-block">
                ← All Industries
              </Link>
              <div className="text-5xl mb-4">{industry.icon}</div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                Technology Solutions for{' '}
                <span className="gradient-text">{industry.title}</span>
              </h1>
              <p className="text-base-300 text-lg leading-relaxed">{industry.description}</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Problems */}
        <section className="section-darker py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
                Challenges We <span className="gradient-text">Solve</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industry.problems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-lg font-semibold text-base-100 mb-4">
                      &ldquo;{item.problem}&rdquo;
                    </h3>
                    <div className="flex items-start gap-2">
                      <span className="text-accent-start mt-0.5">→</span>
                      <p className="text-base-400 leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="section-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
                What We Can <span className="gradient-text">Build For You</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industry.solutions.map((solution, i) => (
                <ScrollReveal key={solution} delay={i * 50}>
                  <div className="flex items-center gap-3 p-4 glass-card">
                    <span className="text-accent-start">✓</span>
                    <span className="text-base-200">{solution}</span>
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
                Tell Us About Your {industry.title.split(' ')[0]} Business
              </h2>
              <p className="text-base-300 mb-8">
                We&apos;ll help you figure out what technology can make the biggest difference.
              </p>
              <Link href="/contact" className="btn-primary inline-flex">
                <span>Get a Free Consultation</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
