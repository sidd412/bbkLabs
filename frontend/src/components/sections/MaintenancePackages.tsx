import ScrollReveal from '@/components/ScrollReveal';

export default function MaintenancePackages() {
  const packages = [
    {
      title: 'Basic Care',
      price: '₹999',
      duration: '/month',
      features: [
        'Up to 100-500 hits/day',
        'Free Hosting & SSL',
        'Weekly Backups',
        'Security Monitoring',
        '2 Minor Updates/mo',
      ],
      popular: false,
    },
    {
      title: 'Growth Plan',
      price: '₹1,999',
      duration: '/month',
      features: [
        'Up to 500-2000 hits/day',
        'Weekly Backups',
        'Priority Support',
        '3 Content Updates/mo',
        'Free Hosting & SSL',
      ],
      popular: true,
    },
    {
      title: 'Business Pro',
      price: '₹2,999',
      duration: '/month',
      features: [
        'Up to 1500-3000 hits/day',
        'Everything in Growth',
        'SEO & Performance',
        '5 Content Updates/mo',
        'Daily Backups',
      ],
      popular: false,
    },
    {
      title: 'Custom ERP/App',
      price: 'Custom',
      duration: '/month',
      features: [
        '3000+ daily hits',
        'Dedicated Server Management',
        '24/7 Priority Support',
        'Database Optimization',
        'Bug Fixes & Patching',
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 lg:py-28" id="maintenance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Long Term Partnership
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              We Don&apos;t Disappear After{' '}
              <span className="gradient-text">Delivery</span>
            </h2>
            <p className="text-base-300 text-lg">
              Technology needs regular care. We provide affordable maintenance plans so you never have to worry about servers, security, or updates.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <ScrollReveal key={pkg.title} delay={idx * 150}>
              <div
                className={`glass-card p-8 h-full flex flex-col relative ${
                  pkg.popular ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-105' : 'border-white/5'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold font-heading text-base-50 mb-2 text-center">{pkg.title}</h3>
                <div className="text-center mb-8 pb-8 border-b border-white/10">
                  <span className="text-4xl font-bold text-white">{pkg.price}</span>
                  <span className="text-base-400">{pkg.duration}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#contact-form" className={`text-center w-full py-3 px-6 rounded-full font-medium transition-colors ${
                  pkg.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-base-50'
                }`}>
                  Select Plan
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
