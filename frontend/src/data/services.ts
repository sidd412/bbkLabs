export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  href: string;
  features: string[];
  pricing: PricingTier[];
  industries: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    shortTitle: 'Websites',
    description:
      'Professional websites that make your business look great online and help customers find you.',
    longDescription:
      'Your website is often the first impression customers have of your business. We build websites that are fast, professional, mobile-friendly and designed to turn visitors into customers. Whether you need a simple business page or a full e-commerce store, we build it right.',
    icon: '🌐',
    href: '/services/website-development',
    features: [
      'Business websites',
      'Landing pages',
      'E-commerce stores',
      'Portfolio websites',
      'School & college websites',
      'Clinic & hospital websites',
      'Hotel & restaurant websites',
      'Real estate websites',
      'Mobile-responsive design',
      'WhatsApp integration',
      'Google Business Profile setup',
      'Basic SEO included',
      'Domain & hosting support',
      'Business email setup',
    ],
    pricing: [
      {
        name: 'Starter',
        price: '₹8,000+',
        description: 'For businesses that need a simple online presence',
        features: ['Single page website', 'Mobile responsive', 'Contact form', 'WhatsApp button', 'Basic SEO'],
      },
      {
        name: 'Business',
        price: '₹15,000+',
        description: 'For growing businesses that need more features',
        features: ['Multi-page website', 'Mobile responsive', 'Contact forms', 'WhatsApp integration', 'Google Business setup', 'SEO optimized', 'Social media links'],
        highlighted: true,
      },
      {
        name: 'Professional',
        price: '₹25,000+',
        description: 'For businesses that want a strong digital presence',
        features: ['Custom design', 'All Business features', 'Blog section', 'Gallery/portfolio', 'Advanced SEO', 'Analytics setup', 'Email integration'],
      },
      {
        name: 'Premium',
        price: '₹40,000+',
        description: 'For businesses needing a fully custom website',
        features: ['Fully custom design', 'E-commerce features', 'Payment integration', 'Admin panel', 'Advanced functionality', 'Performance optimization', 'Priority support'],
      },
    ],
    industries: ['Schools', 'Clinics', 'Hotels', 'Real Estate', 'Restaurants', 'Manufacturing'],
  },
  {
    id: 'software-development',
    title: 'Business Software',
    shortTitle: 'Software',
    description:
      'Custom software that replaces spreadsheets, registers and manual work with smart digital systems.',
    longDescription:
      'If your business still runs on Excel sheets, paper registers or WhatsApp groups, it\'s time for a change. We build custom software that fits exactly how your business works — not the other way around. Manage leads, track inventory, handle appointments, generate reports and more, all in one place.',
    icon: '⚙️',
    href: '/services/software-development',
    features: [
      'Custom CRM',
      'Lead management',
      'Inventory management',
      'Appointment management',
      'Booking systems',
      'Admin dashboards',
      'School management systems',
      'Coaching management',
      'Clinic management',
      'Real estate CRM',
      'Employee management',
      'Reporting dashboards',
      'Customer portals',
      'Data migration',
    ],
    pricing: [
      {
        name: 'Simple System',
        price: '₹30,000+',
        description: 'Basic digital solution for one business function',
        features: ['Single module', 'User dashboard', 'Basic reporting', 'Mobile accessible'],
      },
      {
        name: 'Business Software',
        price: '₹40,000–₹80,000+',
        description: 'Multi-feature system for growing businesses',
        features: ['Multiple modules', 'Admin panel', 'User roles', 'Reports & analytics', 'Data export', 'Mobile responsive'],
        highlighted: true,
      },
      {
        name: 'Advanced',
        price: '₹1L+',
        description: 'Complex system with advanced integrations',
        features: ['Custom architecture', 'Third-party integrations', 'Advanced automation', 'API access', 'Multi-location support'],
      },
      {
        name: 'Enterprise',
        price: '₹2L–₹5L+',
        description: 'Large-scale systems for bigger operations',
        features: ['Enterprise architecture', 'Full customization', 'Multi-tenant', 'Priority support', 'Dedicated team'],
      },
    ],
    industries: ['Schools', 'Coaching', 'Healthcare', 'Real Estate', 'Manufacturing', 'Distribution'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Apps',
    description:
      'Android and iOS apps that keep your business connected with customers wherever they are.',
    longDescription:
      'A mobile app puts your business right in your customer\'s pocket. We build apps for Android, iOS or both — for booking, ordering, communication, management and more. Whether it\'s a parent app for a school, a booking app for a clinic or a delivery app for your business, we make it happen.',
    icon: '📱',
    href: '/services/mobile-app-development',
    features: [
      'Android apps',
      'iOS apps',
      'Cross-platform apps',
      'Customer-facing apps',
      'Employee apps',
      'School parent apps',
      'Booking & appointment apps',
      'Delivery & tracking apps',
      'E-commerce apps',
      'Push notifications',
      'Offline support',
      'App Store submission',
    ],
    pricing: [
      {
        name: 'Basic',
        price: '₹60,000+',
        description: 'Simple app with core functionality',
        features: ['Single platform', 'Core features', 'Push notifications', 'Basic design'],
      },
      {
        name: 'Business',
        price: '₹80,000–₹1.5L+',
        description: 'Feature-rich app for business needs',
        features: ['Cross-platform', 'Custom design', 'Backend integration', 'Analytics', 'Admin panel'],
        highlighted: true,
      },
      {
        name: 'Advanced',
        price: '₹1.5L–₹3L+',
        description: 'Complex app with advanced features',
        features: ['Complex workflows', 'Real-time features', 'Payment integration', 'Maps & location', 'Chat functionality'],
      },
      {
        name: 'Enterprise',
        price: '₹3L+',
        description: 'Large-scale app with full customization',
        features: ['Full customization', 'Multi-role access', 'Advanced security', 'Scalable architecture', 'Ongoing support'],
      },
    ],
    industries: ['Schools', 'Healthcare', 'Delivery', 'E-commerce', 'Hotels', 'Real Estate'],
  },
  {
    id: 'ai-automation',
    title: 'AI & Business Automation',
    shortTitle: 'AI',
    description:
      'Practical AI and automation that saves time, reduces manual work and helps your business respond faster.',
    longDescription:
      'AI isn\'t just for big companies anymore. We help local businesses use practical AI to automate repetitive tasks, respond to customers instantly, qualify leads automatically and save hours of manual work every day. No buzzwords, just real solutions that actually make a difference.',
    icon: '🤖',
    href: '/services/ai-automation',
    features: [
      'AI chatbots',
      'WhatsApp automation',
      'Lead qualification',
      'Automated follow-ups',
      'Appointment automation',
      'Customer support automation',
      'AI FAQ systems',
      'Document processing',
      'Voice AI assistants',
      'Workflow automation',
      'CRM automation',
      'Email automation',
    ],
    pricing: [
      {
        name: 'Basic Automation',
        price: '₹15,000+',
        description: 'Simple automation for one workflow',
        features: ['Single workflow', 'WhatsApp automation', 'Basic triggers', 'Setup & training'],
      },
      {
        name: 'Business Automation',
        price: '₹30,000+',
        description: 'Multi-workflow automation for your business',
        features: ['Multiple workflows', 'Lead automation', 'Follow-up automation', 'Reporting'],
        highlighted: true,
      },
      {
        name: 'AI Assistant',
        price: '₹40,000+',
        description: 'AI-powered assistant for your business',
        features: ['Custom AI chatbot', 'Trained on your business', 'Multi-channel support', '24/7 availability'],
      },
      {
        name: 'Advanced AI',
        price: '₹1L+',
        description: 'Complex AI workflows and integrations',
        features: ['Advanced AI models', 'Complex integrations', 'Custom training', 'Analytics dashboard', 'Ongoing optimization'],
      },
    ],
    industries: ['All industries', 'Schools', 'Healthcare', 'Real Estate', 'Hotels', 'E-commerce'],
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth & SEO',
    shortTitle: 'Growth',
    description:
      'Help your business get discovered online through Google, social media and digital marketing.',
    longDescription:
      'Having a website is just the beginning. We help businesses get found by the right customers through Google search, Google Maps, social media and targeted advertising. Our focus is on measurable results — more enquiries, more calls, more customers.',
    icon: '📈',
    href: '/services/digital-growth',
    features: [
      'Local SEO',
      'Google Business Profile optimization',
      'Search engine optimization',
      'Google Ads management',
      'Social media management',
      'Content marketing',
      'Lead generation',
      'Review management',
      'WhatsApp marketing',
      'Conversion optimization',
      'Analytics & reporting',
      'Competitor analysis',
    ],
    pricing: [
      {
        name: 'Local Starter',
        price: '₹4,999/month+',
        description: 'For businesses starting with local SEO',
        features: ['Google Business optimization', 'Local SEO basics', 'Monthly reporting', 'Review strategy'],
      },
      {
        name: 'Growth',
        price: '₹9,999/month+',
        description: 'For businesses that want to grow online',
        features: ['Full SEO', 'Social media management', 'Content creation', 'Google Business', 'Monthly analytics'],
        highlighted: true,
      },
      {
        name: 'Pro',
        price: '₹19,999/month+',
        description: 'For businesses that want comprehensive digital growth',
        features: ['All Growth features', 'Paid advertising', 'Lead generation', 'Advanced analytics', 'Strategy sessions'],
      },
    ],
    industries: ['All industries', 'Local businesses', 'Schools', 'Healthcare', 'Real Estate'],
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    shortTitle: 'Support',
    description:
      'Ongoing technical support to keep your website and software running smoothly — we don\'t disappear after launch.',
    longDescription:
      'Technology needs regular care. We provide ongoing maintenance, updates, security patches, backups and technical support so you can focus on running your business. Think of us as your long-term technology partner, not just a one-time vendor.',
    icon: '🛡️',
    href: '/services/maintenance-support',
    features: [
      'Website hosting',
      'Regular backups',
      'Security updates',
      'Bug fixes',
      'Content updates',
      'Technical support',
      'Performance monitoring',
      'Uptime monitoring',
      'SSL management',
      'Software improvements',
      'Priority response',
      'Monthly reports',
    ],
    pricing: [
      {
        name: 'Basic',
        price: '₹999/month+',
        description: 'Essential maintenance for simple websites',
        features: ['Hosting', 'SSL certificate', 'Monthly backups', 'Email support'],
      },
      {
        name: 'Standard',
        price: '₹2,499/month+',
        description: 'Regular maintenance with content updates',
        features: ['All Basic features', 'Weekly backups', 'Minor content updates', 'Priority email support', 'Security monitoring'],
        highlighted: true,
      },
      {
        name: 'Business',
        price: '₹4,999/month+',
        description: 'Complete maintenance for business-critical websites',
        features: ['All Standard features', 'Daily backups', 'Performance optimization', 'Phone support', 'Monthly reporting'],
      },
      {
        name: 'Custom AMC',
        price: '₹5,000–₹15,000+/month',
        description: 'Custom maintenance for software and applications',
        features: ['Tailored to your system', 'Bug fixes', 'Feature improvements', 'Dedicated support', 'SLA-backed'],
      },
    ],
    industries: ['All industries'],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.id === slug);
