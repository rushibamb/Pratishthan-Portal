import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createMessage } from '../../services/api';

const ContactSection = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Hardcoded text content
  const content = {
    english: {
      title: "Contact Us",
      subtitle: "Get in Touch with Our Trust",
      formTitle: "Send Us a Message",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      submitButton: "Send Message",
      submitting: "Sending...",
      contactInfo: "Contact Information",
      address: "Kawathe Yemai, Shirur, Pune, Maharashtra 412218",
      phone: "+91 8265027051",
      email: "friendshipgroup1997@gmail.com",
      visitUs: "Visit Our Mandal",
      openingHours: "Opening Hours",
      dailyHours: "Daily: 6:00 AM - 10:00 PM",
      festivalHours: "During Festival: 5:00 AM - 11:00 PM"
    },
    marathi: {
      title: "आमच्याशी संपर्क साधा",
      subtitle: "आमच्या ट्रस्टशी संपर्क साधा",
      formTitle: "आम्हाला संदेश पाठवा",
      namePlaceholder: "तुमचे नाव",
      emailPlaceholder: "तुमचा ईमेल",
      messagePlaceholder: "तुमचा संदेश",
      submitButton: "संदेश पाठवा",
      submitting: "पाठवत आहे...",
      contactInfo: "संपर्क माहिती",
      address: "कवठे येमाई, शिरूर, पुणे, महाराष्ट्र ४१२२१८",
      phone: "+91 8265027051",
      email: "friendshipgroup1997@gmail.com",
      visitUs: "आमच्या मंडळाला भेट द्या",
      openingHours: "वेळापत्रक",
      dailyHours: "दैनंदिन: सकाळी 6:00 - रात्री 10:00",
      festivalHours: "उत्सवाच्या वेळी: सकाळी 5:00 - रात्री 11:00"
    }
  };

  const currentContent = content[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      await createMessage(formData);
      setSubmitMessage(language === 'english' ? 'Thank you for your message! We will get back to you soon.' : 'तुमच्या संदेशाबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(language === 'english' ? 'Failed to send message. Please try again.' : 'संदेश पाठवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50">
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-red-800 mb-6">
              {currentContent.formTitle}
            </h3>

            {submitMessage && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800">
                {submitMessage}
              </div>
            )}
            {submitError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-800">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={currentContent.namePlaceholder}
                  required
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={currentContent.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={currentContent.messagePlaceholder}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isSubmitting ? currentContent.submitting : currentContent.submitButton}
              </button>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-orange-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">
                {currentContent.contactInfo}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">{currentContent.visitUs}</h4>
                    <p className="text-gray-700">{currentContent.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Phone</h4>
                    <p className="text-gray-700">{currentContent.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Email</h4>
                    <p className="text-gray-700">{currentContent.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">{currentContent.openingHours}</h4>
                    <p className="text-gray-700">{currentContent.dailyHours}</p>
                    <p className="text-gray-700">{currentContent.festivalHours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-orange-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d317.1413138034381!2d74.17573740925728!3d18.89204968511534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1753604027604!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ganpati Mandal Trust Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  language: PropTypes.string.isRequired,
};

export default ContactSection;
