export const siteConfig = {
  name: 'BBK Labs',
  tagline: 'Your Business. Our Technology.',
  description:
    'We build websites, software, mobile apps, AI solutions and business automation that help businesses work smarter and grow faster.',
  url: 'https://bbklabs.com',
  ogImage: '/og-image.png',

  contact: {
    phone: '+91XXXXXXXXXX',
    whatsapp: '+91XXXXXXXXXX',
    email: 'hello@bbklabs.com',
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
    defaultTitle: 'BBK Labs — Your Business. Our Technology.',
    titleTemplate: '%s | BBK Labs',
    defaultDescription:
      'BBK Labs builds websites, software, mobile apps, AI solutions and business automation for businesses in Barabanki and beyond. Technology partner for schools, hospitals, real estate, hotels and SMEs.',
    keywords: [
      'IT company Barabanki',
      'software company Barabanki',
      'website development Barabanki',
      'mobile app development',
      'AI automation',
      'business software',
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
