import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.webp';

export default function Footer({ language, toggleLanguage }) {
  const content = {
          english: {
        about: "About Us",
        aboutText: "Ganpati Mandal Trust has been serving the community with devotion and dedication for over 29 years, celebrating the divine blessings of Lord Ganesha.",
        quickLinks: "Quick Links",
        events: "Events",
        gallery: "Gallery",
        socialWork: "Social Work",
        cultural: "Cultural Activities",
        sponsors: "Sponsors",
        contact: "Contact",
        followUs: "Follow Us",
        copyright: "© 2025 Ganpati Mandal Trust. All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        langToggle: "मराठी"
      },
          marathi: {
        about: "आमच्याबद्दल",
        aboutText: "गणपती मंडळ ट्रस्ट 29 वर्षांहून अधिक काळ भक्ती आणि समर्पणाने समाजाची सेवा करत आहे, श्री गणेशाच्या दैवी आशीर्वादाचा उत्सव साजरा करत आहे.",
        quickLinks: "त्वरित दुवे",
        events: "कार्यक्रम",
        gallery: "गॅलरी",
        socialWork: "सामाजिक कार्य",
        cultural: "सांस्कृतिक कार्यक्रम",
        sponsors: "प्रायोजक",
        contact: "संपर्क",
        followUs: "आम्हाला फॉलो करा",
        copyright: "© 2025 गणपती मंडळ ट्रस्ट. सर्व हक्क राखीव.",
        privacyPolicy: "गोपनीयता धोरण",
        termsOfService: "सेवा अटी",
        langToggle: "English"
      }
  };

  const currentContent = content[language];

  return (
    <footer className="bg-gradient-to-b from-red-900 to-orange-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
                          <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-yellow-300 overflow-hidden">
                  <img src={logo} alt="Ganpati Mandal Trust Logo" className="w-full h-full object-cover" />
                </div>
              <h3 className="text-2xl font-bold font-inter">Ganpati Mandal Trust</h3>
            </div>
            <p className="text-orange-100 leading-relaxed mb-6">
              {currentContent.aboutText}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/friendship_group_official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-instagram-line text-white w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <i className="ri-youtube-fill text-white w-5 h-5 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">{currentContent.quickLinks}</h4>
            <ul className="space-y-3">
              <li><a href="#events" className="text-orange-100 hover:text-white transition-colors">{currentContent.events}</a></li>
              <li><a href="#gallery" className="text-orange-100 hover:text-white transition-colors">{currentContent.gallery}</a></li>
              <li><a href="#social" className="text-orange-100 hover:text-white transition-colors">{currentContent.socialWork}</a></li>
              <li><a href="#cultural" className="text-orange-100 hover:text-white transition-colors">{currentContent.cultural}</a></li>
              <li><a href="#sponsors" className="text-orange-100 hover:text-white transition-colors">{currentContent.sponsors}</a></li>
              <li><a href="#contact" className="text-orange-100 hover:text-white transition-colors">{currentContent.contact}</a></li>
            </ul>
          </div>

          {/* Language Toggle */}
          <div>
            <h4 className="text-xl font-bold mb-6">{currentContent.followUs}</h4>
            <div className="space-y-3">
              <button
                onClick={toggleLanguage}
                className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="ri-translate-2-line w-4 h-4 flex items-center justify-center"></i>
                {currentContent.langToggle}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center items-center gap-8 my-12">
          <div className="w-8 h-8 bg-yellow-500/30 rounded-full flex items-center justify-center">
            <i className="ri-flower-line text-yellow-300 w-4 h-4 flex items-center justify-center"></i>
          </div>
          <div className="w-12 h-12 bg-orange-500/30 rounded-full flex items-center justify-center">
            <i className="ri-temple-fill text-orange-300 w-6 h-6 flex items-center justify-center"></i>
          </div>
          <div className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center">
            <i className="ri-flower-line text-red-300 w-4 h-4 flex items-center justify-center"></i>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-orange-100 text-sm">
            {currentContent.copyright}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-orange-100 hover:text-white transition-colors text-sm">
              {currentContent.privacyPolicy}
            </a>
            <a href="#" className="text-orange-100 hover:text-white transition-colors text-sm">
              {currentContent.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  language: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};