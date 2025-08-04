import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMembers, createMember, updateMember, deleteMember } from '../../services/api';
import ImageUpload from '../components/ImageUpload';

const ManageMembersPage = () => {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  const [generalMembers, setGeneralMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formData, setFormData] = useState({
    name: { english: '', marathi: '' },
    designation: { english: '', marathi: '' },
    imageUrl: '',
    phone: '',
    email: '',
    isFeatured: false,
  });

  const fetchMembers = async () => {
    // Keep loading true until both API calls are finished
    setLoading(true);
    try {
      const [featuredRes, generalRes] = await Promise.all([
        getMembers(true),
        getMembers(false),
      ]);
      setFeaturedMembers(featuredRes.data);
      setGeneralMembers(generalRes.data);
      setError(''); // Clear any previous errors on success
    } catch (err) {
      setError('Failed to fetch members. Please ensure the backend server is running and try refreshing the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenModal = (member = null, isFeatured = false) => {
    setCurrentMember(member);
    setError('');
    if (member) {
      setFormData({
        ...member,
        designation: member.designation || { english: '', marathi: '' },
        phone: member.phone || '',
        email: member.email || '',
      });
    } else {
      setFormData({
        name: { english: '', marathi: '' },
        designation: { english: '', marathi: '' },
        imageUrl: '',
        phone: '',
        email: '',
        isFeatured: isFeatured,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMember(null);
  };

  const handleChange = (e, lang, field) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (lang && field) {
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
    setError('');

    if (!formData.name.english || !formData.name.marathi) {
      setError('Please fill out the name in both languages.');
      return;
    }
    if (formData.isFeatured && (!formData.designation.english || !formData.designation.marathi || !formData.imageUrl)) {
      setError('Featured members require a designation and an image.');
      return;
    }

    setLoading(true);
    const payload = { ...formData };
    if (!payload.isFeatured) {
      delete payload.designation;
    }

    try {
      if (currentMember) {
        await updateMember(currentMember._id, payload);
      } else {
        await createMember(payload);
      }
      await fetchMembers();
      handleCloseModal();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save member.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setLoading(true);
      try {
        await deleteMember(id);
        await fetchMembers();
      } catch (err) {
        setError('Failed to delete member.');
      } finally {
        setLoading(false);
      }
    }
  };

  // **FIX: Robust rendering logic**
  const renderContent = () => {
    if (loading) {
      return <p className="text-center mt-8">Loading members...</p>;
    }
    if (error && !isModalOpen) {
      return <p className="text-center mt-8 text-red-600">{error}</p>;
    }
    return (
      <>
        {/* Featured Members Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured Leadership Team</h2>
            <button onClick={() => handleOpenModal(null, true)} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add Featured Member</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-4">
              {featuredMembers.map(member => (
                <li key={member._id} className="p-4 border rounded-md flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={member.imageUrl} alt={member.name.english} className="w-16 h-16 object-cover rounded-full bg-gray-100"/>
                    <div>
                      <p className="font-bold">{member.name.english}</p>
                      <p className="text-sm text-gray-600">{member.designation.english}</p>
                      {(member.phone || member.email) && (
                        <div className="text-xs text-gray-500 mt-1">
                          {member.phone && <span className="mr-3">📞 {member.phone}</span>}
                          {member.email && <span>📧 {member.email}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleOpenModal(member, true)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                    <button onClick={() => handleDelete(member._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* General Members Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Trust Members (General List)</h2>
            <button onClick={() => handleOpenModal(null, false)} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Add General Member</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              {generalMembers.map(member => (
                <li key={member._id} className="p-2 border-b flex justify-between items-center">
                  <div>
                    <p>{member.name.english} / {member.name.marathi}</p>
                    {(member.phone || member.email) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {member.phone && <span className="mr-3">📞 {member.phone}</span>}
                        {member.email && <span>📧 {member.email}</span>}
                      </div>
                    )}
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleOpenModal(member, false)} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Edit</button>
                    <button onClick={() => handleDelete(member._id)} className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-6">Manage Trust Members</h1>
      
      {renderContent()}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{currentMember ? 'Edit Member' : 'Add New Member'}</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 text-orange-600 border-gray-300 rounded" />
                <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium">Is a Featured Member?</label>
              </div>
              <div>
                <label className="block text-sm font-medium">Name (English)</label>
                <input type="text" value={formData.name.english} onChange={(e) => handleChange(e, 'english', 'name')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Name (Marathi)</label>
                <input type="text" value={formData.name.marathi} onChange={(e) => handleChange(e, 'marathi', 'name')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <ImageUpload 
                label="Member Photo (Required for featured members)"
                value={formData.imageUrl}
                onUploadSuccess={handleImageUploadSuccess}
              />
              {formData.isFeatured && (
                <>
                  <div>
                    <label className="block text-sm font-medium">Designation (English)</label>
                    <input type="text" value={formData.designation.english} onChange={(e) => handleChange(e, 'english', 'designation')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Designation (Marathi)</label>
                    <input type="text" value={formData.designation.marathi} onChange={(e) => handleChange(e, 'marathi', 'designation')} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium">Phone Number (Optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
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

export default ManageMembersPage;
