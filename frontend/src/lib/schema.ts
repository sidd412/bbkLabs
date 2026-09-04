import { siteConfig } from './config';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: Object.values(siteConfig.social),
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
      postalCode: siteConfig.location.pin,
    },
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
      postalCode: siteConfig.location.pin,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Lucknow' },
      { '@type': 'City', name: 'Barabanki' },
      { '@type': 'State', name: 'Uttar Pradesh' },
    ],
    priceRange: '₹₹',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Automation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Growth' } },
      ],
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${siteConfig.url}${service.url}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'State',
      name: 'Uttar Pradesh',
    },
  };
}
