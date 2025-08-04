import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents, createUpcomingEvent, updateUpcomingEvent, deleteUpcomingEvent } from '../../services/api';

const ManageUpcomingEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: { english: '', marathi: '' },
    dateTime: { english: '', marathi: '' },
    icon: '',
    iconBgColor: '',
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await getUpcomingEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch upcoming events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    setError('');
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        title: { english: '', marathi: '' },
        dateTime: { english: '', marathi: '' },
        icon: 'ri-calendar-event-line',
        iconBgColor: 'bg-yellow-500',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleChange = (e, lang, field) => {
    const { name, value } = e.target;
    if (lang && field) {
      setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentItem) {
        await updateUpcomingEvent(currentItem._id, formData);
      } else {
        await createUpcomingEvent(formData);
      }
      await fetchEvents();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setLoading(true);
      try {
        await deleteUpcomingEvent(id);
        await fetchEvents();
      } catch (err) {
        setError('Failed to delete event.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Upcoming Cultural Events</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add New Event</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event._id} className="p-4 border rounded-md flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${event.iconBgColor} rounded-full flex items-center justify-center`}>
                  <i className={`${event.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <p className="font-bold">{event.title.english}</p>
                  <p className="text-sm text-gray-600">{event.dateTime.english}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleOpenModal(event)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">{currentItem ? 'Edit' : 'Add'} Upcoming Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title (English)</label>
                <input type="text" value={formData.title.english} onChange={(e) => handleChange(e, 'english', 'title')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Title (Marathi)</label>
                <input type="text" value={formData.title.marathi} onChange={(e) => handleChange(e, 'marathi', 'title')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Date & Time (English)</label>
                <input type="text" value={formData.dateTime.english} onChange={(e) => handleChange(e, 'english', 'dateTime')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Date & Time (Marathi)</label>
                <input type="text" value={formData.dateTime.marathi} onChange={(e) => handleChange(e, 'marathi', 'dateTime')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Icon Class (e.g., ri-calendar-event-line)</label>
                <input type="text" name="icon" value={formData.icon} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Icon BG Color (e.g., bg-yellow-500)</label>
                <input type="text" name="iconBgColor" value={formData.iconBgColor} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUpcomingEventsPage;
