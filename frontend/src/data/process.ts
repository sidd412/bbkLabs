export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Understand',
    description:
      'We start by listening. We learn about your business, your customers, your challenges and your goals before suggesting any technology.',
    icon: '🎯',
  },
  {
    step: 2,
    title: 'Plan',
    description:
      'Based on what we learn, we design a clear plan — what to build, how it helps, what it costs and how long it takes.',
    icon: '📝',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'We build your solution with care — clean code, thoughtful design and regular updates so you always know what\'s happening.',
    icon: '🔨',
  },
  {
    step: 4,
    title: 'Grow',
    description:
      'After launch, we help you get the most from your technology — improvements, support and new solutions as your business grows.',
    icon: '🚀',
  },
];

export const usps = [
  {
    title: 'Business-First Technology',
    description: 'We understand the problem before suggesting the solution. No unnecessary technology, only what your business actually needs.',
    icon: '💡',
  },
  {
    title: 'One Technology Partner',
    description: 'Website, software, apps, AI, automation — everything under one roof. No need to juggle multiple vendors.',
    icon: '🤝',
  },
  {
    title: 'Simple Communication',
    description: 'We explain everything in plain language. You should never need to understand technology to work with us.',
    icon: '💬',
  },
  {
    title: 'Affordable & Professional',
    description: 'Quality technology at accessible prices. We\'re not the cheapest, but we deliver real value that your business can actually use.',
    icon: '✨',
  },
  {
    title: 'Locally Accessible',
    description: 'Starting from Barabanki means you can talk to us, meet us and get real support — not just a faceless vendor online.',
    icon: '📍',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We don\'t disappear after delivery. We become your ongoing technology partner — maintenance, improvements and growth.',
    icon: '🔄',
  },
];
