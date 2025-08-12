import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivities } from '../../services/api';
import { getOptimizedUrl } from '../../utils/cloudinary';

const SocialWork = ({ language }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded text content
  const content = {
    english: {
      title: "Social Work Activities",
      subtitle: "Serving the Community with Compassion",
      learnMore: "Learn More",
      close: "Close"
    },
    marathi: {
      title: "सामाजिक कार्य",
      subtitle: "करुणेने समाजसेवा",
      learnMore: "अधिक जाणून घ्या",
      close: "बंद करा"
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch activities specifically for the 'social' section
        const { data } = await getActivities('social');
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch social work activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
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
    <section id="social" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
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

        {/* Activities Grid - now dynamic */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={getOptimizedUrl(activity.imageUrl, { width: 400, height: 300 })}
                  alt={activity.title[language]}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <i className={`${activity.icon} text-white text-xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  {activity.title[language]}
                </h3>
                <p className="text-gray-700 leading-relaxed line-clamp-3 mb-4">
                  {activity.description[language]}
                </p>
                
                <button 
                  onClick={() => openModal(activity)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap"
                >
                  {currentContent.learnMore}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Activity Details */}
      {isModalOpen && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 flex justify-between items-center">
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
                  <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
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

                  {selectedActivity.impact && selectedActivity.impact[language] && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'english' ? 'Community Impact' : 'समाजावरील प्रभाव'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedActivity.impact[language]}
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

SocialWork.propTypes = {
  language: PropTypes.string.isRequired,
};

export default SocialWork;
