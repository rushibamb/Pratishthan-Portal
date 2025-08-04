import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivities, getUpcomingEvents } from '../../services/api';

const CulturalActivities = ({ language }) => {
  const [activities, setActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]); // New state for upcoming events
  const [loading, setLoading] = useState(true);

  // Hardcoded text content
  const content = {
    english: {
      title: "Cultural Activities",
      subtitle: "Preserving Heritage Through Art and Performance"
    },
    marathi: {
      title: "सांस्कृतिक कार्यक्रम",
      subtitle: "कला आणि सादरीकरणाद्वारे वारसा जपणे"
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch both activity cards and upcoming events at the same time
        const [activitiesRes, upcomingEventsRes] = await Promise.all([
          getActivities('cultural'),
          getUpcomingEvents()
        ]);
        setActivities(activitiesRes.data);
        setUpcomingEvents(upcomingEventsRes.data);
      } catch (error) {
        console.error("Failed to fetch cultural activities data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const currentContent = content[language];

  if (loading) {
    return <div className="py-20 text-center">Loading Activities...</div>;
  }

  return (
    <section id="cultural" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4 font-inter">
            {currentContent.title}
          </h2>
          <p className="text-xl text-orange-700 font-medium">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Activities Grid - dynamic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={activity.imageUrl}
                  alt={activity.title[language]}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${activity.icon} text-white text-xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  {activity.title[language]}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activity.description[language]}
                </p>
                <button className="mt-4 bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap">
                  {language === 'english' ? 'Participate' : 'सहभागी व्हा'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events - now dynamic */}
        <div className="mt-16 bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-orange-200">
          <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">
            {language === 'english' ? 'Upcoming Cultural Events' : 'आगामी सांस्कृतिक कार्यक्रम'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map(event => (
              <div key={event._id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                <div className={`w-12 h-12 ${event.iconBgColor} rounded-full flex items-center justify-center`}>
                  <i className={`${event.icon} text-white w-6 h-6 flex items-center justify-center`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">
                    {event.title[language]}
                  </h4>
                  <p className="text-orange-700">
                    {event.dateTime[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

CulturalActivities.propTypes = {
  language: PropTypes.string.isRequired,
};

export default CulturalActivities;
