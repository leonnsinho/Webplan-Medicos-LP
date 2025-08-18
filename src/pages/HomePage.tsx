import React from 'react';
import HeroSection from '../components/HeroSection';
import PartnersSection from '../components/PartnersSection';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO />
      <HeroSection />
      <PartnersSection />
      <ContactForm />
    </>
  );
};

export default HomePage;
