import React from 'react';
import HeroSection from '../components/HeroSection';
import PartnersSection from '../components/PartnersSection';
import { BlogPreview } from '../components/BlogPreview';
import AboutWebplanSection from '../components/AboutWebplanSection';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <HeroSection />
      <PartnersSection />
      <BlogPreview />
      <AboutWebplanSection />
      <ContactForm />
    </>
  );
};

export default HomePage;
