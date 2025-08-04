import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMessages, updateMessageStatus, deleteMessage } from '../../services/api';

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await getMessages();
      setMessages(data);
    } catch (err) {
      setError('Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (message) => {
    try {
      await updateMessageStatus(message._id, { isRead: !message.isRead });
      await fetchMessages(); // Refresh the list
    } catch (err) {
      setError('Failed to update message status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        await fetchMessages(); // Refresh the list
      } catch (err) {
        setError('Failed to delete message.');
      }
    }
  };

  return (
    <div className="p-6">
      <Link to="/admin/dashboard" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-2xl font-bold mb-4">Contact Form Messages</h1>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg._id} className={msg.isRead ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${msg.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {msg.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{msg.name}</div>
                    <div className="text-sm text-gray-500">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 max-w-md truncate">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => handleToggleRead(msg)} className="text-indigo-600 hover:text-indigo-900">
                      {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button onClick={() => handleDelete(msg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMessagesPage;
