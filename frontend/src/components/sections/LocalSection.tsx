import ScrollReveal from '@/components/ScrollReveal';

export default function LocalSection() {
  return (
    <section className="section-dark py-20 lg:py-28 relative overflow-hidden" id="local">
      {/* Background accent */}
      <div className="glow-spot w-[500px] h-[500px] bg-accent-start -right-40 top-0 opacity-[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
                Built From Barabanki
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-6">
                Local Enough to Trust.{' '}
                <span className="gradient-text">Professional Enough to Respect.</span>
              </h2>
              <div className="space-y-4 text-base-300 leading-relaxed">
                <p>
                  BBK Labs started in Barabanki because we believe quality technology should be accessible to every business — not just those in metros.
                </p>
                <p>
                  Being local means you can meet us, talk to us and get real support whenever you need it. But being local doesn&apos;t mean limited — our technology, approach and ambition are built for businesses that think bigger.
                </p>
                <p>
                  We&apos;re starting here, but we&apos;re not stopping here.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-base-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Barabanki
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-start/40 rounded-full" />
                  Ayodhya
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-start/20 rounded-full" />
                  Lucknow
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-start/10 rounded-full" />
                  UP & Beyond
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass-card p-10 text-center">
              <div className="text-6xl mb-6">📍</div>
              <h3 className="text-2xl font-bold font-heading text-base-50 mb-4">
                Free Digital Audit
              </h3>
              <p className="text-base-300 mb-3">
                for businesses in Barabanki & nearby areas
              </p>
              <p className="text-base-400 text-sm leading-relaxed mb-6">
                We&apos;ll review your current digital presence — website, Google visibility,
                WhatsApp setup, online enquiry process — and give you a clear picture of
                what&apos;s working and what could be better.
              </p>
              <p className="text-base-500 text-xs mb-6">No cost. No obligation. Genuinely useful.</p>
              <a
                href="/contact"
                className="btn-primary inline-flex"
              >
                <span>Request a Free Audit</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
