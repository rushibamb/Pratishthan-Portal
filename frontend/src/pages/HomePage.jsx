import React from 'react';
import PropTypes from 'prop-types';

// Import all your section components
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import EventSchedule from '../components/sections/EventSchedule';
import TrustMembers from '../components/sections/TrustMembers';
import MediaGallery from '../components/sections/MediaGallery';
import SocialWork from '../components/sections/SocialWork';
import CulturalActivities from '../components/sections/CulturalActivities';
import PastHighlights from '../components/sections/PastHighlights';
import SponsorsSection from '../components/sections/SponsorsSection';
import ContactSection from '../components/sections/ContactSection';

// Import LazySection for performance optimization
import LazySection from '../components/LazySection';

export default function HomePage({ language }) {
  return (
    <main>
      {/* Above the fold - load immediately */}
      <HeroSection language={language} />
      <AboutSection language={language} />
      
      {/* Below the fold - lazy load for better performance */}
      <LazySection>
        <EventSchedule language={language} />
      </LazySection>
      
      <LazySection>
        <TrustMembers language={language} />
      </LazySection>
      
      <LazySection>
        <MediaGallery language={language} />
      </LazySection>
      
      <LazySection>
        <SocialWork language={language} />
      </LazySection>
      
      <LazySection>
        <CulturalActivities language={language} />
      </LazySection>
      
      <LazySection>
        <PastHighlights language={language} />
      </LazySection>
      
      <LazySection>
        <SponsorsSection language={language} />
      </LazySection>
      
      <LazySection>
        <ContactSection language={language} />
      </LazySection>
    </main>
  );
}

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
};