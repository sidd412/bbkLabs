'use client';

import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import ScrollReveal from '@/components/ScrollReveal';

const serviceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'software', label: 'Software' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'ai-automation', label: 'AI / Automation' },
  { value: 'seo-digital-growth', label: 'SEO / Digital Growth' },
  { value: 'business-automation', label: 'Business Automation' },
  { value: 'not-sure', label: 'Not sure — I need guidance' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    serviceNeeded: '',
    requirement: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const response = await api.submitLead(formData);

    if (response.success) {
      setStatus('success');
      setMessage(response.message || 'Thank you! We will get back to you shortly.');
      setFormData({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        businessType: '',
        serviceNeeded: '',
        requirement: '',
      });
    } else {
      setStatus('error');
      setMessage(response.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section-dark py-20 lg:py-28" id="contact-form">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="glass-card p-8 lg:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-3">
                Get a <span className="gradient-text">Free Consultation</span>
              </h2>
              <p className="text-base-400">
                Not sure what you need? That&apos;s okay. Tell us about your business and we&apos;ll help you figure it out.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="text-5xl mb-4 block">✅</span>
                <h3 className="text-xl font-semibold text-base-50 mb-2">Thank You!</h3>
                <p className="text-base-300">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-base-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-base-300 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your business name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-base-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-base-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-base-300 mb-2">
                      Business Type
                    </label>
                    <input
                      type="text"
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. School, Clinic, Hotel..."
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceNeeded" className="block text-sm font-medium text-base-300 mb-2">
                      What do you need? *
                    </label>
                    <select
                      id="serviceNeeded"
                      name="serviceNeeded"
                      required
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select an option</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium text-base-300 mb-2">
                    Briefly Describe Your Requirement
                  </label>
                  <textarea
                    id="requirement"
                    name="requirement"
                    rows={4}
                    value={formData.requirement}
                    onChange={handleChange}
                    className="form-input resize-none"
                    placeholder="Tell us what you're looking for or what problem you want to solve..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  id="form-submit"
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Get a Free Consultation'}</span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
