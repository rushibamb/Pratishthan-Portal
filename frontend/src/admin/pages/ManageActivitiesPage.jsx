import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../../services/api';
import ImageUpload from '../components/ImageUpload'; // Import the new component

const ManageActivitiesPage = () => {
  // Get the section type ('social' or 'cultural') from the URL
  const { sectionType } = useParams(); 
  const pageTitle = sectionType.charAt(0).toUpperCase() + sectionType.slice(1);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    sectionType: sectionType,
    title: { english: '', marathi: '' },
    description: { english: '', marathi: '' },
    imageUrl: '',
    icon: '',
  });

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const { data } = await getActivities(sectionType);
      setActivities(data);
    } catch (err) {
      setError(`Failed to fetch ${sectionType} activities.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [sectionType]); // Re-fetch if the sectionType changes

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        sectionType: sectionType,
        title: { english: '', marathi: '' },
        description: { english: '', marathi: '' },
        imageUrl: '',
        icon: '',
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

  const handleImageUploadSuccess = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentItem) {
        await updateActivity(currentItem._id, formData);
      } else {
        await createActivity(formData);
      }
      await fetchActivities();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save activity.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setLoading(true);
      try {
        await deleteActivity(id);
        await fetchActivities();
      } catch (err) {
        setError('Failed to delete activity.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage {pageTitle} Activities</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add New Activity</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map(activity => (
            <div key={activity._id} className="border rounded-lg p-4">
              <img src={activity.imageUrl} alt={activity.title.english} className="w-full h-40 object-cover rounded-md mb-4"/>
              <h3 className="font-bold">{activity.title.english}</h3>
              <p className="text-sm text-gray-600 truncate">{activity.description.english}</p>
              <div className="space-x-2 mt-4">
                <button onClick={() => handleOpenModal(activity)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(activity._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{currentItem ? 'Edit' : 'Add'} Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title (English)</label>
                <input type="text" value={formData.title.english} onChange={(e) => handleChange(e, 'english', 'title')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Title (Marathi)</label>
                <input type="text" value={formData.title.marathi} onChange={(e) => handleChange(e, 'marathi', 'title')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description (English)</label>
                <textarea rows="3" value={formData.description.english} onChange={(e) => handleChange(e, 'english', 'description')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Description (Marathi)</label>
                <textarea rows="3" value={formData.description.marathi} onChange={(e) => handleChange(e, 'marathi', 'description')} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <ImageUpload 
                label="Activity Image"
                value={formData.imageUrl}
                onUploadSuccess={handleImageUploadSuccess}
              />
              <div>
                <label className="block text-sm font-medium">Icon (e.g., ri-music-line)</label>
                <input type="text" name="icon" value={formData.icon} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
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

export default ManageActivitiesPage;
