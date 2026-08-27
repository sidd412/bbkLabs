import ScrollReveal from '@/components/ScrollReveal';

export default function TrustBar() {
  return (
    <section className="section-darker py-20 lg:py-28" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
              Why We Are The{' '}
              <span className="gradient-text">No. 1 IT Agency</span> in Barabanki
            </h2>
            <p className="text-base-300 text-lg leading-relaxed">
              We don&apos;t just sell services; we deliver 100% guaranteed perfect solutions. 
              Our technology is designed to make your business completely tension-free and highly profitable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: '100%',
                title: 'Satisfaction Guaranteed',
                description:
                  'We stand by our work. Our solutions are guaranteed to meet your requirements and solve your core business problems.',
              },
              {
                number: 'No.1',
                title: 'Local Trusted Partner',
                description:
                  'Proudly rooted in Barabanki. We provide face-to-face support and unmatched reliability that freelancers simply cannot offer.',
              },
              {
                number: '24/7',
                title: 'Premium Quality',
                description:
                  'We use world-class technologies (like Google Cloud) to ensure your website and apps never go down and run lightning fast.',
              },
            ].map((item, i) => (
              <div
                key={item.number}
                className={`glass-card p-8 stagger-${i + 1}`}
              >
                <span className="text-5xl font-bold font-heading gradient-text opacity-30">
                  {item.number}
                </span>
                <h3 className="text-xl font-semibold font-heading text-base-50 mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-base-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
