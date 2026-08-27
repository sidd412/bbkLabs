import ContactForm from '@/components/sections/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';
import { generateSeo } from '@/lib/seo';
import { siteConfig } from '@/lib/config';

export const metadata = generateSeo({
  title: 'Contact Us',
  description:
    'Get in touch with BBK Labs for a free consultation. WhatsApp, call, email or fill out the form — we make it easy to reach us.',
  path: '/contact',
});

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-6">
              Let&apos;s Talk About{' '}
              <span className="gradient-text">Your Business</span>
            </h1>
            <p className="text-base-300 text-lg">
              Tell us what you&apos;re trying to solve. We&apos;ll listen and help you figure out the right technology solution.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: '💬',
              title: 'WhatsApp',
              description: 'Chat with us directly',
              action: whatsappUrl,
              external: true,
              highlight: true,
            },
            {
              icon: '📞',
              title: 'Call Us',
              description: siteConfig.contact.phone,
              action: `tel:${siteConfig.contact.phone}`,
              external: false,
            },
            {
              icon: '✉️',
              title: 'Email',
              description: siteConfig.contact.email,
              action: `mailto:${siteConfig.contact.email}`,
              external: false,
            },
            {
              icon: '📍',
              title: 'Location',
              description: siteConfig.contact.address,
              action: '#',
              external: false,
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <a
                href={item.action}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={`block glass-card p-6 text-center h-full ${
                  item.highlight ? 'border-green-500/20 hover:border-green-500/40' : ''
                }`}
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="text-base-100 font-semibold mb-1">{item.title}</h3>
                <p className="text-base-400 text-sm">{item.description}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <ContactForm />

      {/* Business Hours */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ScrollReveal>
          <div className="glass-card p-8 text-center">
            <h3 className="text-lg font-semibold font-heading mb-4">Business Hours</h3>
            <div className="space-y-2 text-base-400">
              <p>Monday–Friday: {siteConfig.businessHours.weekdays}</p>
              <p>Saturday: {siteConfig.businessHours.saturday}</p>
              <p>Sunday: {siteConfig.businessHours.sunday}</p>
            </div>
            <p className="text-base-500 text-sm mt-4">
              You can WhatsApp us anytime — we&apos;ll respond during business hours.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
