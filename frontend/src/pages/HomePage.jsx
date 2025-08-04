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

export default function HomePage({ language }) {
  return (
    <main>
      <HeroSection language={language} />
      <AboutSection language={language} />
      <EventSchedule language={language} />
      <TrustMembers language={language} />
      <MediaGallery language={language} />
      <SocialWork language={language} />
      <CulturalActivities language={language} />
      <PastHighlights language={language} />
      <SponsorsSection language={language} />
      <ContactSection language={language} />
    </main>
  );
}

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
};