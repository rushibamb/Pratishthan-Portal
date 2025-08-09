import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDonationInfo, updateDonationInfo } from '../../services/api';
import ImageUpload from '../components/ImageUpload';

const ManageDonationPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: { english: '', marathi: '' },
    qrCodeUrl: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branch: ''
    },
    upiId: '',
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDonationInfo = async () => {
      try {
        const { data } = await getDonationInfo();
        if (data) {
          setFormData({
            title: data.title || '',
            description: data.description || { english: '', marathi: '' },
            qrCodeUrl: data.qrCodeUrl || '',
            bankDetails: data.bankDetails || {
              accountName: '',
              accountNumber: '',
              ifscCode: '',
              bankName: '',
              branch: ''
            },
            upiId: data.upiId || '',
            isActive: data.isActive !== undefined ? data.isActive : true
          });
        }
      } catch (err) {
        setError('Failed to fetch donation information.');
      } finally {
        setLoading(false);
      }
    };
    fetchDonationInfo();
  }, []);

  const handleChange = (e, lang, field) => {
    const { name, value } = e.target;
    if (lang && field) {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else if (name.startsWith('bankDetails.')) {
      const bankField = name.replace('bankDetails.', '');
      setFormData(prev => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [bankField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUploadSuccess = (url) => {
    setFormData(prev => ({ ...prev, qrCodeUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateDonationInfo(formData);
      setSuccess('Donation information updated successfully!');
    } catch (err) {
      setError('Failed to update donation information.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.title) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Manage Donation Information</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      
      <form onSubmit={handleSubmit} className="max-w-4xl bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Basic Information */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="isActive"
                id="isActive"
                value={formData.isActive}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="description_english" className="block text-sm font-medium text-gray-700">Description (English)</label>
              <textarea
                name="description_english"
                id="description_english"
                value={formData.description.english}
                onChange={(e) => handleChange(e, 'english', 'description')}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="description_marathi" className="block text-sm font-medium text-gray-700">Description (Marathi)</label>
              <textarea
                name="description_marathi"
                id="description_marathi"
                value={formData.description.marathi}
                onChange={(e) => handleChange(e, 'marathi', 'description')}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4">QR Code</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">QR Code Image</label>
            <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
            {formData.qrCodeUrl && (
              <div className="mt-4">
                <img src={formData.qrCodeUrl} alt="QR Code" className="w-32 h-32 object-contain border border-gray-300 rounded" />
              </div>
            )}
          </div>
        </div>

        {/* Bank Details */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bankDetails.accountName" className="block text-sm font-medium text-gray-700">Account Name</label>
              <input
                type="text"
                name="bankDetails.accountName"
                id="bankDetails.accountName"
                value={formData.bankDetails.accountName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                name="bankDetails.accountNumber"
                id="bankDetails.accountNumber"
                value={formData.bankDetails.accountNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
              <input
                type="text"
                name="bankDetails.ifscCode"
                id="bankDetails.ifscCode"
                value={formData.bankDetails.ifscCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                name="bankDetails.bankName"
                id="bankDetails.bankName"
                value={formData.bankDetails.bankName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="bankDetails.branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                name="bankDetails.branch"
                id="bankDetails.branch"
                value={formData.bankDetails.branch}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* UPI ID */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4">UPI Payment</h2>
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              name="upiId"
              id="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="example@upi"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Donation Information'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageDonationPage;
