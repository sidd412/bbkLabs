export interface Problem {
  problem: string;
  solution: string;
  icon: string;
}

export const problems: Problem[] = [
  {
    problem: 'Getting enquiries but losing track of them?',
    solution: 'Lead management system that never lets an enquiry slip through.',
    icon: '📋',
  },
  {
    problem: 'Customers keep asking the same questions?',
    solution: 'WhatsApp automation or AI assistant that responds instantly, 24/7.',
    icon: '💬',
  },
  {
    problem: 'Your business still runs on Excel and registers?',
    solution: 'Custom business software built for how your business actually works.',
    icon: '📊',
  },
  {
    problem: "People can't find you on Google?",
    solution: 'Local SEO + Google Business optimization to put you on the map.',
    icon: '🔍',
  },
  {
    problem: 'You need a professional online presence?',
    solution: 'A modern business website that builds trust and attracts customers.',
    icon: '🌐',
  },
  {
    problem: 'Your team wastes hours on repetitive tasks?',
    solution: 'Business automation that handles routine work, so your team can focus on what matters.',
    icon: '⚡',
  },
];
