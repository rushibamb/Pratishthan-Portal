import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLinkCard = ({ to, title, description }) => (
  <Link to={to} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
    <h3 className="text-lg font-bold text-orange-600">{title}</h3>
    <p className="mt-2 text-sm text-gray-600 flex-grow">{description}</p>
    <span className="mt-4 text-sm font-semibold text-orange-700 self-start">Manage &rarr;</span>
  </Link>
);

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AdminLinkCard to="/admin/manage/hero" title="Manage Hero Section" description="Edit the main welcome text, subtitle, and background image." />
              <AdminLinkCard to="/admin/manage/about" title="Manage About Section" description="Update the main image and the four statistic numbers." />
              <AdminLinkCard to="/admin/manage/events" title="Manage Events" description="Add, edit, delete, and reorder the event schedule timeline." />
              <AdminLinkCard to="/admin/manage/sponsors" title="Manage Sponsors" description="Manage the list of sponsors, their logos, and descriptions." />
              <AdminLinkCard to="/admin/manage/members" title="Manage Trust Members" description="Control the featured leadership team and the general member list." />
              <AdminLinkCard to="/admin/manage/media" title="Manage Media Gallery" description="Upload, edit, and delete photos and videos from the gallery." />
              <AdminLinkCard to="/admin/manage/activities/social" title="Manage Social Work" description="Manage the cards displayed in the Social Work section." />
              <AdminLinkCard to="/admin/manage/activities/cultural" title="Manage Cultural Activities" description="Manage the main grid of cultural activity cards." />
              <AdminLinkCard to="/admin/manage/upcoming-events" title="Manage Upcoming Events" description="Manage the list of upcoming events in the Cultural section." />
              <AdminLinkCard to="/admin/manage/highlights" title="Manage Past Highlights" description="Manage content for previous years, including photos and videos." />
              <AdminLinkCard to="/admin/manage/messages" title="View Contact Messages" description="View and manage messages submitted through the contact form." />

              <AdminLinkCard to="/admin/manage/donation" title="Manage Donation Information" description="Manage QR codes, bank details, and UPI information for donations." />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
