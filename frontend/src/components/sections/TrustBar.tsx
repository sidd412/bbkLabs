import ScrollReveal from '@/components/ScrollReveal';

export default function TrustBar() {
  return (
    <section className="section-darker py-20 lg:py-28" id="trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
              A Trusted Technology Partner for{' '}
              <span className="gradient-text">Local Businesses</span>
            </h2>
            <p className="text-base-300 text-lg leading-relaxed">
              We don&apos;t just sell technology; we solve business problems. 
              Our solutions are designed to help you streamline operations, reach more customers, and scale sustainably.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                number: '5+',
                title: 'Business Clients',
                description:
                  'We have already partnered with ambitious local businesses to modernize their operations and improve their digital presence.',
              },
              {
                number: '15+',
                title: 'Successful Projects',
                description:
                  'From custom websites to business automation, we have successfully delivered over 15 projects tailored to specific business needs.',
              },
              {
                number: '100%',
                title: 'Local Support',
                description:
                  'Proudly rooted in Uttar Pradesh. We provide direct, transparent communication and unmatched reliability that freelancers cannot offer.',
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
