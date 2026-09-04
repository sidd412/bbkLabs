import { generateSeo } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TrustBar from '@/components/sections/TrustBar';
import CTASection from '@/components/sections/CTASection';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ city: string }>;
};

// Capitalize first letter of city
const formatCity = (city: string) => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = formatCity(resolvedParams.city);
  
  return generateSeo({
    title: `Technology Solutions & Software Company in ${city}`,
    description: `BBK Labs is the leading technology partner in ${city}. We provide custom website development, software, mobile apps, and business automation solutions for local businesses in ${city}.`,
    path: `/locations/${resolvedParams.city.toLowerCase()}`,
  });
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const city = formatCity(resolvedParams.city);

  return (
    <>
      <div className="pt-20 bg-base-900 text-center py-12 px-4 sm:px-6 lg:px-8 border-b border-base-800">
        <h1 className="text-3xl lg:text-5xl font-bold font-heading text-white">
          Digital Solutions for Businesses in <span className="gradient-text">{city}</span>
        </h1>
        <p className="mt-4 text-base-300 max-w-2xl mx-auto">
          We help local businesses in {city} grow their online presence, automate operations, and build custom technology solutions.
        </p>
      </div>
      
      <TrustBar />
      <ServicesGrid />
      <CTASection />
    </>
  );
}
