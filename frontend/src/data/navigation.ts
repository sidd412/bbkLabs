export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Business Software', href: '/services/software-development' },
      { label: 'Mobile Apps', href: '/services/mobile-app-development' },
      { label: 'AI & Automation', href: '/services/ai-automation' },
      { label: 'Digital Growth & SEO', href: '/services/digital-growth' },
      { label: 'Maintenance & Support', href: '/services/maintenance-support' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Schools & Education', href: '/industries/schools' },
      { label: 'Healthcare & Clinics', href: '/industries/healthcare' },
      { label: 'Real Estate', href: '/industries/real-estate' },
      { label: 'Hotels & Restaurants', href: '/industries/hotels-restaurants' },
      { label: 'Manufacturing & SMEs', href: '/industries/manufacturing' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
