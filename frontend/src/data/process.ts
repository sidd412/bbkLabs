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
    title: '100% Guaranteed Solutions',
    description: 'We don\'t just deliver code; we deliver results. If the solution doesn\'t solve your business problem, we will fix it until it does.',
    icon: '✅',
  },
  {
    title: 'No.1 Agency in Barabanki',
    description: 'We are the most trusted, highly-rated technology partner locally. We bring Silicon Valley standards to Barabanki businesses.',
    icon: '🏆',
  },
  {
    title: 'One Technology Partner',
    description: 'Website, software, apps, AI, automation — everything under one roof. No need to juggle multiple unreliable vendors.',
    icon: '🤝',
  },
  {
    title: 'Simple Communication',
    description: 'We explain everything in plain language. You should never need to understand technology to work with us.',
    icon: '💬',
  },
  {
    title: 'Locally Accessible',
    description: 'Being physically present in Barabanki means you get face-to-face support, real accountability, and zero tension.',
    icon: '📍',
  },
  {
    title: 'Lifetime Partnership',
    description: 'We don\'t disappear after delivery. We become your ongoing technology partner — ensuring 24/7 uptime, maintenance, and growth.',
    icon: '🔄',
  },
];
