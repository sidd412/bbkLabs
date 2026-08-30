export const siteConfig = {
  name: 'BBK Labs',
  tagline: 'Your Business. Our Technology.',
  description:
    'We build websites, software, mobile apps, AI solutions and business automation that help businesses work smarter and grow faster.',
  url: 'https://bbklabs.com',
  ogImage: '/og-image.png',

  contact: {
    phone: '+919129054029',
    whatsapp: '+919129054029',
    email: 'siddharthaverma6213@gmail.com',
    address: 'Barabanki, Uttar Pradesh, India',
  },

  whatsappMessage:
    'Hi BBK Labs, I would like to discuss a technology solution for my business.',

  social: {
    instagram: 'https://instagram.com/bbklabs',
    linkedin: 'https://linkedin.com/company/bbklabs',
    twitter: 'https://twitter.com/bbklabs',
    facebook: 'https://facebook.com/bbklabs',
    youtube: 'https://youtube.com/@bbklabs',
  },

  businessHours: {
    weekdays: '10:00 AM – 7:00 PM',
    saturday: '10:00 AM – 5:00 PM',
    sunday: 'Closed',
  },

  googleBusinessUrl: 'https://g.page/bbklabs',

  analytics: {
    gaId: '', // Google Analytics ID
    gtmId: '', // Google Tag Manager ID
  },

  seo: {
    defaultTitle: 'BBK Labs — No. 1 IT & Software Agency in Barabanki',
    titleTemplate: '%s | BBK Labs',
    defaultDescription:
      '100% Guaranteed Perfect Technology Solutions. The most trusted website, software, mobile app, and AI development agency in Barabanki. Your business, our technology.',
    keywords: [
      'Best website maker in Barabanki',
      'No.1 IT company Barabanki',
      'software development Barabanki 100% guaranteed',
      'App developer near me',
      'E-commerce website builder UP',
      'School management software Barabanki',
      'Hospital management system Barabanki',
      'Top digital agency Barabanki',
      'Website developer Barabanki',
      'Business automation UP',
      'AI solutions company India',
      'BBK Labs',
    ] as string[],
  },

  location: {
    city: 'Barabanki',
    state: 'Uttar Pradesh',
    country: 'India',
    pin: '225001',
  },
} as const;

export const serviceLabels = [
  'Websites',
  'Software',
  'Apps',
  'AI',
  'Automation',
] as const;

export type ServiceLabel = (typeof serviceLabels)[number];
