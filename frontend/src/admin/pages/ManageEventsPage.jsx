import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for the modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null); // null for new, object for editing
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: { english: '', marathi: '' },
    activities: { english: '', marathi: '' },
  });

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    setCurrentEvent(event);
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        date: '',
        time: '',
        title: { english: '', marathi: '' },
        activities: { english: '', marathi: '' },
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleChange = (e, lang, field) => {
    const { name, value } = e.target;
    if (lang && field) {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentEvent) {
        await updateEvent(currentEvent._id, formData);
      } else {
        await createEvent(formData);
      }
      await fetchEvents(); // Refresh the list
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
        await deleteEvent(id);
        await fetchEvents(); // Refresh the list
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
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add New Event</button>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event._id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold">{event.title.english} / {event.title.marathi}</p>
                <p className="text-sm text-gray-600">{event.date} @ {event.time}</p>
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
            <h2 className="text-xl font-bold mb-4">{currentEvent ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields for date, time, titles, and activities */}
              <div>
                <label className="block text-sm font-medium">Date (e.g., Day 1)</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Time</label>
                <input type="text" name="time" value={formData.time} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Title (English)</label>
                <input type="text" value={formData.title.english} onChange={(e) => handleChange(e, 'english', 'title')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Title (Marathi)</label>
                <input type="text" value={formData.title.marathi} onChange={(e) => handleChange(e, 'marathi', 'title')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Activities (English)</label>
                <textarea value={formData.activities.english} onChange={(e) => handleChange(e, 'english', 'activities')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Activities (Marathi)</label>
                <textarea value={formData.activities.marathi} onChange={(e) => handleChange(e, 'marathi', 'activities')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
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

export default ManageEventsPage;
