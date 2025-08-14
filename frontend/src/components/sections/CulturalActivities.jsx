import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivities, getUpcomingEvents } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';

const CulturalActivities = ({ language }) => {
  const [activities, setActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]); // New state for upcoming events
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded text content
  const content = {
    english: {
      title: "Cultural Activities",
      subtitle: "Preserving Heritage Through Art and Performance",
      learnMore: "Learn More",
      close: "Close"
    },
    marathi: {
      title: "सांस्कृतिक कार्यक्रम",
      subtitle: "कला आणि सादरीकरणाद्वारे वारसा जपणे",
      learnMore: "अधिक जाणून घ्या",
      close: "बंद करा"
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

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 md:hover:scale-105">
              <div className="relative">
                <img
                  src={getOptimizedUrl(activity.imageUrl, { width: 360, height: 240 })}
                  alt={activity.title[language]}
                  className="w-full h-40 md:h-48 object-cover object-top"
                />
                <div className="absolute top-3 left-3 w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${activity.icon} text-white text-lg md:text-xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2 md:mb-3">
                  {activity.title[language]}
                </h3>
                <p className="text-gray-700 leading-relaxed line-clamp-3 mb-3 md:mb-4 text-sm md:text-base">
                  {activity.description[language]}
                </p>
                <button 
                  onClick={() => openModal(activity)}
                  className="bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white px-5 md:px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm md:text-base"
                >
                  {currentContent.learnMore}
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
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {upcomingEvents.map(event => (
              <div key={event._id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-orange-50 rounded-lg">
                <div className={`w-10 h-10 md:w-12 md:h-12 ${event.iconBgColor} rounded-full flex items-center justify-center`}>
                  <i className={`${event.icon} text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 text-sm md:text-base">{event.title[language]}</h4>
                  <p className="text-xs md:text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Activity Details */}
      {isModalOpen && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-400 to-orange-500 text-white p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {selectedActivity.title[language]}
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="relative">
                  <img
                    src={getOptimizedUrl(selectedActivity.imageUrl, { width: 500, height: 400 })}
                    alt={selectedActivity.title[language]}
                    className="w-full h-80 object-cover object-top rounded-lg shadow-lg"
                  />
                  <div className="absolute top-4 left-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <i className={`${selectedActivity.icon} text-white text-2xl`}></i>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'english' ? 'Description' : 'वर्णन'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedActivity.description[language]}
                    </p>
                  </div>

                  {/* Additional details can be added here */}
                  {selectedActivity.details && selectedActivity.details[language] && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'english' ? 'Additional Details' : 'अतिरिक्त तपशील'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedActivity.details[language]}
                      </p>
                    </div>
                  )}

                  {selectedActivity.history && selectedActivity.history[language] && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'english' ? 'Cultural History' : 'सांस्कृतिक इतिहास'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedActivity.history[language]}
                      </p>
                    </div>
                  )}

                  {selectedActivity.participation && selectedActivity.participation[language] && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'english' ? 'How to Participate' : 'सहभाग कसा घ्यावा'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedActivity.participation[language]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {currentContent.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

CulturalActivities.propTypes = {
  language: PropTypes.string.isRequired,
};

export default CulturalActivities;
