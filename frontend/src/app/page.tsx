import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ServicesGrid from '@/components/sections/ServicesGrid';
import IndustriesSection from '@/components/sections/IndustriesSection';
import ProcessSteps from '@/components/sections/ProcessSteps';
import WhyBBKLabs from '@/components/sections/WhyBBKLabs';
import LocalSection from '@/components/sections/LocalSection';
import ProblemSolution from '@/components/sections/ProblemSolution';
import PricingOverview from '@/components/sections/PricingOverview';
import MaintenancePackages from '@/components/sections/MaintenancePackages';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import ContactForm from '@/components/sections/ContactForm';
import { faqSchema } from '@/lib/schema';
import { faqs } from '@/data/faqs';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <IndustriesSection />
      <ProcessSteps />
      <WhyBBKLabs />
      <ProblemSolution />
      <LocalSection />
      <PricingOverview />
      <MaintenancePackages />
      <FAQSection />
      <ContactForm />
      <CTASection />
    </>
  );
}
