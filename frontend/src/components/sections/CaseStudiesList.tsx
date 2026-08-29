'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { api } from '@/lib/api';

export default function CaseStudiesList() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCases() {
      try {
        const response: any = await api.getCaseStudies();
        if (response.success && response.data?.caseStudies) {
          setCaseStudies(response.data.caseStudies);
        }
      } catch (error) {
        console.error('Failed to fetch case studies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCases();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-base-400">Loading projects...</div>;
  }

  if (caseStudies.length === 0) {
    return (
      <ScrollReveal delay={200}>
        <div className="max-w-xl mx-auto glass-card p-12 text-center">
          <span className="text-5xl block mb-6">🔨</span>
          <h2 className="text-2xl font-bold font-heading mb-4">Coming Soon</h2>
          <p className="text-base-400 leading-relaxed mb-6">
            We&apos;re currently working on our first projects. Once they&apos;re complete, we&apos;ll share the full story here.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            <span>Start a Project With Us</span>
          </Link>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {caseStudies.map((study, idx) => (
        <ScrollReveal key={study.slug} delay={idx * 100}>
          <Link href={`/case-studies/${study.slug}`} className="block h-full glass-card overflow-hidden group hover:border-blue-500/30 transition-colors">
            {study.coverImage ? (
              <div className="h-48 w-full bg-base-900 overflow-hidden">
                <img src={study.coverImage} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="h-48 w-full bg-base-900 flex items-center justify-center border-b border-white/5">
                <span className="text-4xl">💼</span>
              </div>
            )}
            <div className="p-6">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 block">
                {study.industry}
              </span>
              <h3 className="text-xl font-bold font-heading text-base-50 mb-2 group-hover:text-blue-400 transition-colors">
                {study.title}
              </h3>
              <p className="text-base-400 text-sm mb-4 line-clamp-3">
                {study.summary || study.challenge}
              </p>
              <span className="text-sm font-medium text-blue-500 flex items-center">
                Read Case Study <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
