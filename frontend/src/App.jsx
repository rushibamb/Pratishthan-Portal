import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public facing components
import Navbar from '/src/components/Navbar.jsx';
import Footer from '/src/components/Footer.jsx';
import HomePage from '/src/pages/HomePage.jsx';
import NotFoundPage from '/src/pages/NotFoundPage.jsx';

// Admin components
import LoginPage from '/src/admin/pages/LoginPage.jsx';
import DashboardPage from '/src/admin/pages/DashboardPage.jsx';
import ProtectedRoute from '/src/admin/components/ProtectedRoute.jsx';
import ManageHeroPage from '/src/admin/pages/ManageHeroPage.jsx';
import ManageAboutPage from '/src/admin/pages/ManageAboutPage.jsx';
import ManageEventsPage from '/src/admin/pages/ManageEventsPage.jsx';
import ManageSponsorsPage from '/src/admin/pages/ManageSponsorsPage.jsx';
import ManageMembersPage from '/src/admin/pages/ManageMembersPage.jsx';
import ManageMediaPage from '/src/admin/pages/ManageMediaPage.jsx';
import ManageActivitiesPage from '/src/admin/pages/ManageActivitiesPage.jsx';
import ManageHighlightsPage from '/src/admin/pages/ManageHighlightsPage.jsx';
import ManageMessagesPage from '/src/admin/pages/ManageMessagesPage.jsx';
import ManageUpcomingEventsPage from '/src/admin/pages/ManageUpcomingEventsPage.jsx'; // Import new page

function App() {
  const [language, setLanguage] = useState('english');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'english' ? 'marathi' : 'english'));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={
          <>
            <Navbar language={language} toggleLanguage={toggleLanguage} />
            <HomePage language={language} />
            <Footer language={language} toggleLanguage={toggleLanguage} />
          </>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/manage/hero" element={<ProtectedRoute><ManageHeroPage /></ProtectedRoute>} />
        <Route path="/admin/manage/about" element={<ProtectedRoute><ManageAboutPage /></ProtectedRoute>} />
        <Route path="/admin/manage/events" element={<ProtectedRoute><ManageEventsPage /></ProtectedRoute>} />
        <Route path="/admin/manage/sponsors" element={<ProtectedRoute><ManageSponsorsPage /></ProtectedRoute>} />
        <Route path="/admin/manage/members" element={<ProtectedRoute><ManageMembersPage /></ProtectedRoute>} />
        <Route path="/admin/manage/media" element={<ProtectedRoute><ManageMediaPage /></ProtectedRoute>} />
        <Route path="/admin/manage/activities/:sectionType" element={<ProtectedRoute><ManageActivitiesPage /></ProtectedRoute>} />
        <Route path="/admin/manage/highlights" element={<ProtectedRoute><ManageHighlightsPage /></ProtectedRoute>} />
        <Route path="/admin/manage/messages" element={<ProtectedRoute><ManageMessagesPage /></ProtectedRoute>} />
        <Route path="/admin/manage/upcoming-events" element={<ProtectedRoute><ManageUpcomingEventsPage /></ProtectedRoute>} /> {/* Add new route */}

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
