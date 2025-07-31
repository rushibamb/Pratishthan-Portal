import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getEvents } from '../../services/api';

const EventSchedule = ({ language }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded text for title and subtitle
  const content = {
    english: {
      title: "Event Schedule",
      subtitle: "Ganeshotsav 2024 - 11 Days of Celebration"
    },
    marathi: {
      title: "कार्यक्रम वेळापत्रक",
      subtitle: "गणेशोत्सव 2024 - 11 दिवसांचा उत्सव"
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const currentContent = content[language];

  if (loading) {
    return <div className="py-20 text-center">Loading Schedule...</div>;
  }

  return (
    <section id="events" className="py-12 md:py-20 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-900 mb-4 font-inter">
            {currentContent.title}
          </h2>
          <p className="text-lg sm:text-xl text-orange-700 font-medium">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={event._id} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <i className="ri-calendar-event-line text-white w-5 h-5 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-800">
                          {event.title[language]}
                        </h3>
                        <p className="text-orange-600 font-medium text-sm">{event.date}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-orange-700 font-medium flex items-center gap-2">
                        <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                        {event.time}
                      </p>
                    </div>
                    <p className="text-gray-700">
                      {event.activities[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event._id} className="relative flex items-start">
                <div className="absolute left-6 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center z-10">
                  <span className="text-white font-bold text-xs">{index + 1}</span>
                </div>
                <div className="ml-16 w-full">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-calendar-event-line text-white w-4 h-4 flex items-center justify-center"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-red-800 leading-tight">
                          {event.title[language]}
                        </h3>
                        <p className="text-orange-600 font-medium text-sm">{event.date}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-orange-700 font-medium flex items-center gap-2 text-sm">
                        <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                        {event.time}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {event.activities[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

EventSchedule.propTypes = {
  language: PropTypes.string.isRequired,
};

export default EventSchedule;
