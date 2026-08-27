import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import ScrollReveal from '@/components/ScrollReveal';

export default function CTASection() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <section className="section-dark py-20 lg:py-28 relative overflow-hidden" id="cta-bottom">
      <div className="glow-spot w-[600px] h-[600px] bg-accent-start top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <ScrollReveal>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading mb-6">
            Ready to Talk About{' '}
            <span className="gradient-text">Your Business?</span>
          </h2>
          <p className="text-base-300 text-lg lg:text-xl mb-4 max-w-2xl mx-auto">
            Tell us what your business needs. We&apos;ll listen, understand and help you figure out the right technology solution.
          </p>
          <p className="text-base-500 text-sm mb-10">
            Free consultation. No obligation. No jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-center" id="cta-bottom-primary">
              <span>Get a Free Consultation</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-center"
              id="cta-bottom-whatsapp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
