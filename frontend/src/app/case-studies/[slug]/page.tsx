'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import ScrollReveal from '@/components/ScrollReveal';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudy() {
      if (!slug) return;
      try {
        const response: any = await api.getCaseStudy(slug as string);
        if (response.success && response.data) {
          setStudy(response.data);
        } else {
          router.push('/case-studies');
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        router.push('/case-studies');
      } finally {
        setLoading(false);
      }
    }
    fetchStudy();
  }, [slug, router]);

  if (loading) {
    return <div className="pt-32 pb-20 text-center text-base-400">Loading...</div>;
  }

  if (!study) return null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-8">
            <span className="text-accent-start text-sm font-semibold uppercase tracking-wider mb-2 block">
              {study.industry} Case Study
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 text-base-50">
              {study.title}
            </h1>
            <p className="text-xl text-base-300">Client: {study.client}</p>
          </div>
        </ScrollReveal>

        {study.coverImage && (
          <ScrollReveal delay={100}>
            <div className="w-full h-[400px] sm:h-[500px] rounded-xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
              <img src={study.coverImage} alt={study.title} className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        )}

        <div className="space-y-12">
          {study.challenge && (
            <ScrollReveal>
              <h2 className="text-2xl font-bold font-heading mb-4 text-base-50 border-b border-white/10 pb-2">The Challenge</h2>
              <div className="prose prose-invert max-w-none text-base-300">
                {study.challenge.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </ScrollReveal>
          )}

          {study.solution && (
            <ScrollReveal>
              <h2 className="text-2xl font-bold font-heading mb-4 text-base-50 border-b border-white/10 pb-2">Our Solution</h2>
              <div className="prose prose-invert max-w-none text-base-300">
                {study.solution.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </ScrollReveal>
          )}

          {study.results && (
            <ScrollReveal>
              <h2 className="text-2xl font-bold font-heading mb-4 text-base-50 border-b border-white/10 pb-2">The Results</h2>
              <div className="prose prose-invert max-w-none text-base-300">
                {study.results.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}
