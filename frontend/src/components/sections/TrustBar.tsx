import ScrollReveal from '@/components/ScrollReveal';

export default function TrustBar() {
  return (
    <section className="section-darker py-20 lg:py-28" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
              Technology That Solves{' '}
              <span className="gradient-text">Real Business Problems</span>
            </h2>
            <p className="text-base-300 text-lg leading-relaxed">
              We don&apos;t sell technology for the sake of technology. We understand your
              business first, then recommend solutions that actually make a difference.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: '01',
                title: 'Understand First',
                description:
                  'We listen to your business challenges before suggesting any technology.',
              },
              {
                number: '02',
                title: 'Build Right',
                description:
                  'We create solutions that fit your business — not force your business to fit the solution.',
              },
              {
                number: '03',
                title: 'Grow Together',
                description:
                  'We stay as your long-term technology partner, evolving the solution as your business grows.',
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
