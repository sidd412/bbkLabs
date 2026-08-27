'use client';

import { useState } from 'react';
import { faqs } from '@/data/faqs';
import ScrollReveal from '@/components/ScrollReveal';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-darker py-20 lg:py-28" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mt-3 mb-5">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                  id={`faq-${i}`}
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base-100 font-medium pr-4 group-hover:text-accent-start transition-colors">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-base-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`faq-content ${openIndex === i ? 'open' : ''}`}
                  style={{
                    maxHeight: openIndex === i ? '500px' : '0',
                    padding: openIndex === i ? '0 24px 24px' : '0 24px',
                  }}
                >
                  <p className="text-base-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
