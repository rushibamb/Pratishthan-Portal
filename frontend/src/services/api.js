import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// --- Authentication Service Functions ---
export const login = (credentials) => API.post('/auth/login', credentials);


// --- Content Service Functions ---
export const getContent = (sectionName) => API.get(`/content/${sectionName}`);
export const updateContent = (sectionName, contentData) => API.put(`/content/${sectionName}`, contentData);


// --- Event Service Functions ---
export const getEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const updateEventOrder = (events) => API.put('/events/order', events);


// --- Sponsor Service Functions ---
export const getSponsors = () => API.get('/sponsors');
export const createSponsor = (sponsorData) => API.post('/sponsors', sponsorData);
export const updateSponsor = (id, sponsorData) => API.put(`/sponsors/${id}`, sponsorData);
export const deleteSponsor = (id) => API.delete(`/sponsors/${id}`);
export const updateSponsorOrder = (sponsors) => API.put('/sponsors/order', sponsors);


// --- Member Service Functions ---
export const getMembers = (isFeatured) => {
  const params = isFeatured !== undefined ? { featured: isFeatured } : {};
  return API.get('/members', { params });
};
export const createMember = (memberData) => API.post('/members', memberData);
export const updateMember = (id, memberData) => API.put(`/members/${id}`, memberData);
export const deleteMember = (id) => API.delete(`/members/${id}`);
export const updateMemberOrder = (members) => API.put('/members/order', members);


// --- Media Service Functions ---
export const getMedia = (type) => {
  const params = type ? { type } : {};
  return API.get('/media', { params });
};
export const createMediaItem = (mediaData) => API.post('/media', mediaData);
export const updateMediaItem = (id, mediaData) => API.put(`/media/${id}`, mediaData);
export const deleteMediaItem = (id) => API.delete(`/media/${id}`);
export const updateMediaOrder = (mediaItems) => API.put('/media/order', mediaItems);


// --- Activity Service Functions ---
export const getActivities = (sectionType) => API.get(`/activities/${sectionType}`);
export const createActivity = (activityData) => API.post('/activities', activityData);
export const updateActivity = (id, activityData) => API.put(`/activities/${id}`, activityData);
export const deleteActivity = (id) => API.delete(`/activities/${id}`);
export const updateActivityOrder = (activities) => API.put('/activities/order', activities);


// --- Highlight Service Functions ---
export const getAllYears = () => API.get('/highlights/years/all');
export const getHighlightsByYear = (year) => API.get(`/highlights/${year}`);
export const createYear = (yearData) => API.post('/highlights', yearData);
export const deleteYear = (year) => API.delete(`/highlights/${year}`);
export const addPhotoToYear = (year, photoData) => API.post(`/highlights/${year}/photos`, photoData);
export const deletePhotoFromYear = (year, photoId) => API.delete(`/highlights/${year}/photos/${photoId}`);
export const addVideoToYear = (year, videoData) => API.post(`/highlights/${year}/videos`, videoData);
export const deleteVideoFromYear = (year, videoId) => API.delete(`/highlights/${year}/videos/${videoId}`);


// --- Contact Message Service Functions ---
export const createMessage = (messageData) => API.post('/messages', messageData);
export const getMessages = () => API.get('/messages');
export const updateMessageStatus = (id, statusData) => API.put(`/messages/${id}`, statusData);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);


// --- Upload Service Functions ---
export const uploadImage = (formData) => API.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


// --- Upcoming Event Service Functions (NEW) ---
export const getUpcomingEvents = () => API.get('/upcoming-events');
export const createUpcomingEvent = (eventData) => API.post('/upcoming-events', eventData);
export const updateUpcomingEvent = (id, eventData) => API.put(`/upcoming-events/${id}`, eventData);
export const deleteUpcomingEvent = (id) => API.delete(`/upcoming-events/${id}`);


export default API;
