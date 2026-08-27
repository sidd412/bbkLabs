export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  solutions: string[];
  problems: ProblemSolution[];
}

export interface ProblemSolution {
  problem: string;
  solution: string;
}

export const industries: Industry[] = [
  {
    id: 'schools',
    title: 'Schools & Education',
    description:
      'Help your school manage admissions, communicate with parents and build a strong digital presence.',
    icon: '🏫',
    href: '/industries/schools',
    solutions: [
      'School website',
      'Online admission forms',
      'Enquiry management',
      'Student management system',
      'Fee management',
      'Attendance tracking',
      'Parent communication',
      'Parent mobile app',
      'WhatsApp notifications',
      'School ERP',
    ],
    problems: [
      { problem: 'Still managing admissions on paper?', solution: 'Online admission & enquiry management' },
      { problem: 'Parents keep calling for updates?', solution: 'Parent app with real-time notifications' },
      { problem: 'Fee tracking is a headache?', solution: 'Digital fee management system' },
      { problem: 'No online presence for your school?', solution: 'Professional school website' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    description:
      'Help your hospital or clinic manage appointments, patient records and build a trusted online presence.',
    icon: '🏥',
    href: '/industries/healthcare',
    solutions: [
      'Clinic/hospital website',
      'Doctor profiles',
      'Online appointment booking',
      'Patient management system',
      'Digital reports',
      'WhatsApp reminders',
      'CRM for clinics',
      'Patient portal',
      'Multi-branch management',
      'Analytics & reporting',
    ],
    problems: [
      { problem: 'Patients missing appointments?', solution: 'Automated WhatsApp & SMS reminders' },
      { problem: 'Appointment schedule is chaotic?', solution: 'Online appointment booking system' },
      { problem: 'Patient records scattered everywhere?', solution: 'Digital patient management system' },
      { problem: 'Patients can\'t find you online?', solution: 'Professional website + Google Business optimization' },
    ],
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description:
      'Manage property listings, track leads and automate follow-ups to close more deals.',
    icon: '🏢',
    href: '/industries/real-estate',
    solutions: [
      'Property listing website',
      'Lead management CRM',
      'Agent dashboard',
      'WhatsApp follow-ups',
      'Lead assignment system',
      'Property comparison tools',
      'Customer portal',
      'Analytics & reports',
      'Automated lead nurturing',
      'Virtual tour support',
    ],
    problems: [
      { problem: 'Losing track of property enquiries?', solution: 'Real estate CRM with lead tracking' },
      { problem: 'Agents not following up on time?', solution: 'Automated follow-up reminders' },
      { problem: 'No professional way to showcase properties?', solution: 'Property listing website with search & filters' },
      { problem: 'Can\'t track which marketing channel works?', solution: 'Lead source analytics dashboard' },
    ],
  },
  {
    id: 'hotels-restaurants',
    title: 'Hotels & Restaurants',
    description:
      'Showcase your menu, manage bookings and help customers find you easily on Google.',
    icon: '🏨',
    href: '/industries/hotels-restaurants',
    solutions: [
      'Hotel/restaurant website',
      'Digital menu',
      'Room/table booking system',
      'Banquet enquiry management',
      'Google Business optimization',
      'WhatsApp integration',
      'Review management',
      'Social media presence',
      'Online ordering',
      'Customer feedback system',
    ],
    problems: [
      { problem: 'Customers can\'t find your menu online?', solution: 'Digital menu with WhatsApp ordering' },
      { problem: 'Banquet enquiries getting lost?', solution: 'Enquiry management with automated follow-ups' },
      { problem: 'Not showing up on Google Maps?', solution: 'Google Business Profile optimization' },
      { problem: 'No online booking system?', solution: 'Room & table reservation system' },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & SMEs',
    description:
      'Digitize your operations with inventory management, CRM, order tracking and business dashboards.',
    icon: '🏭',
    href: '/industries/manufacturing',
    solutions: [
      'Business website',
      'Product catalogue',
      'CRM system',
      'Inventory management',
      'Order management',
      'Distributor portal',
      'Employee management',
      'Business dashboards',
      'Workflow automation',
      'Reporting & analytics',
    ],
    problems: [
      { problem: 'Still managing inventory on Excel?', solution: 'Digital inventory management system' },
      { problem: 'No visibility into business performance?', solution: 'Custom business dashboard with real-time data' },
      { problem: 'Distributors need better ordering process?', solution: 'Distributor portal with order management' },
      { problem: 'Business still doesn\'t have a website?', solution: 'Professional business website with product catalogue' },
    ],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.id === slug);
