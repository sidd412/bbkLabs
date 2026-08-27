import ScrollReveal from '@/components/ScrollReveal';

export default function PricingOverview() {
  const tiers = [
    {
      label: 'Digital Presence',
      description: 'Get your business online with a professional website',
      price: 'Starting from ₹8,000',
      icon: '🌐',
    },
    {
      label: 'Business Website',
      description: 'Multi-page website with SEO and integrations',
      price: 'Starting from ₹15,000',
      icon: '💼',
    },
    {
      label: 'Business Software',
      description: 'Custom CRM, management systems and dashboards',
      price: 'Starting from ₹40,000',
      icon: '⚙️',
    },
    {
      label: 'Mobile Apps',
      description: 'Android, iOS or cross-platform applications',
      price: 'Starting from ₹60,000',
      icon: '📱',
    },
    {
      label: 'AI & Automation',
      description: 'Chatbots, WhatsApp automation, workflow automation',
      price: 'Starting from ₹15,000',
      icon: '🤖',
    },
    {
      label: 'Digital Growth',
      description: 'SEO, Google Ads, social media management',
      price: 'Starting from ₹4,999/mo',
      icon: '📈',
    },
  ];

  return (
    <section className="section-dark py-20 lg:py-28" id="pricing-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Solutions for Every Budget
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              Technology That Fits{' '}
              <span className="gradient-text">Your Business</span>
            </h2>
            <p className="text-base-300 text-lg">
              Every business is different. Final pricing always depends on your specific requirements.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.label} delay={i * 80}>
              <div className="glass-card p-7 h-full">
                <span className="text-2xl">{tier.icon}</span>
                <h3 className="text-lg font-semibold font-heading text-base-50 mt-3 mb-2">
                  {tier.label}
                </h3>
                <p className="text-base-400 text-sm mb-4">{tier.description}</p>
                <p className="text-accent-start font-heading font-bold">{tier.price}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <p className="text-center text-base-500 text-sm mt-8">
            All prices are indicative starting points. We provide a custom quote after understanding your requirements.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
