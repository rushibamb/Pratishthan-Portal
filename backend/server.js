const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const connectDB = require('./config/db');
const contentRoutes = require('./routes/contentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const memberRoutes = require('./routes/memberRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const activityRoutes = require('./routes/activityRoutes');
const highlightRoutes = require('./routes/highlightRoutes');
const contactMessageRoutes = require('./routes/contactMessageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const upcomingEventRoutes = require('./routes/upcomingEventRoutes');
const donationRoutes = require('./routes/donationRoutes'); // Import donation routes

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/highlights', highlightRoutes);
app.use('/api/messages', contactMessageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/upcoming-events', upcomingEventRoutes);
app.use('/api/donations', donationRoutes); // Mount donation routes

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the Mandal Backend!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
