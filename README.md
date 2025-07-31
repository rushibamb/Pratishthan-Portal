# Mandal - Cultural Organization Portal

A comprehensive fullstack web application for managing cultural organization activities, events, members, and content. Built with modern technologies including React, Node.js, Express, and MongoDB.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Hero Section**: Dynamic landing page with cultural content
- **About Section**: Organization information and mission
- **Event Management**: Display and manage cultural events
- **Member Directory**: Trust members and organization leadership
- **Media Gallery**: Photo and video content showcase
- **Sponsor Section**: Partner and sponsor information
- **Contact Form**: Interactive contact and inquiry system
- **Admin Panel**: Protected admin interface for content management
- **Cultural Activities**: Showcase of cultural programs
- **Social Work**: Community service initiatives
- **Past Highlights**: Historical events and achievements

### Backend Features
- **RESTful API**: Complete backend API with Express.js
- **Authentication**: JWT-based authentication system
- **File Upload**: Cloudinary integration for media management
- **Database**: MongoDB with Mongoose ODM
- **Admin Management**: Protected routes for content management
- **Contact Management**: Message handling system
- **Event Management**: CRUD operations for events
- **Member Management**: Organization member profiles
- **Media Management**: Photo and video content handling
- **Sponsor Management**: Partner and sponsor information
- **Content Management**: Dynamic page content system

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **ESLint**: Code linting and formatting

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Cloud image and video management
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 📁 Project Structure

```
mandal/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── authController.js
│   │   ├── contactMessageController.js
│   │   ├── contentController.js
│   │   ├── eventController.js
│   │   ├── highlightController.js
│   │   ├── mediaController.js
│   │   ├── memberController.js
│   │   ├── sponsorController.js
│   │   └── upcomingEventController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Activity.js
│   │   ├── ContactMessage.js
│   │   ├── Event.js
│   │   ├── Highlight.js
│   │   ├── Media.js
│   │   ├── Member.js
│   │   ├── PageContent.js
│   │   ├── Sponsor.js
│   │   ├── UpcomingEvent.js
│   │   └── User.js
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactMessageRoutes.js
│   │   ├── contentRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── highlightRoutes.js
│   │   ├── mediaRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── sponsorRoutes.js
│   │   ├── upcomingEventRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── pages/
│   │   │       ├── DashboardPage.jsx
│   │   │       ├── LoginPage.jsx
│   │   │       ├── ManageAboutPage.jsx
│   │   │       ├── ManageActivitiesPage.jsx
│   │   │       ├── ManageEventsPage.jsx
│   │   │       ├── ManageHeroPage.jsx
│   │   │       ├── ManageHighlightsPage.jsx
│   │   │       ├── ManageMediaPage.jsx
│   │   │       ├── ManageMembersPage.jsx
│   │   │       ├── ManageMessagesPage.jsx
│   │   │       ├── ManageSponsorsPage.jsx
│   │   │       └── ManageUpcomingEventsPage.jsx
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── sections/
│   │   │       ├── AboutSection.jsx
│   │   │       ├── ContactSection.jsx
│   │   │       ├── CulturalActivities.jsx
│   │   │       ├── EventSchedule.jsx
│   │   │       ├── HeroSection.jsx
│   │   │       ├── MediaGallery.jsx
│   │   │       ├── PastHighlights.jsx
│   │   │       ├── SocialWork.jsx
│   │   │       ├── SponsorsSection.jsx
│   │   │       └── TrustMembers.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── photos/
    ├── ganapati_photo.jpg
    └── logo.jpg
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for media uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushibamb/Pratishthan-Portal.git
   cd Pratishthan-Portal
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Database Setup**
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Media
- `GET /api/media` - Get all media
- `POST /api/media` - Upload media
- `DELETE /api/media/:id` - Delete media

### Contact Messages
- `GET /api/contact-messages` - Get all messages
- `POST /api/contact-messages` - Submit contact form
- `DELETE /api/contact-messages/:id` - Delete message

### Content Management
- `GET /api/content` - Get page content
- `PUT /api/content/:id` - Update page content

## 🔐 Admin Panel

Access the admin panel at `/admin` with the following features:
- Dashboard overview
- Event management
- Member management
- Media gallery management
- Contact message management
- Content editing
- Sponsor management
- Activity management

## 🎨 Customization

### Styling
- Modify `frontend/src/index.css` for global styles
- Update `frontend/tailwind.config.js` for Tailwind configuration
- Edit component-specific styles in individual JSX files

### Content
- Update content through the admin panel
- Modify static content in component files
- Add new sections by creating new components

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection
3. Set up Cloudinary credentials
4. Deploy to platforms like Heroku, Vercel, or Railway

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rushi Bamb**
- GitHub: [@rushibamb](https://github.com/rushibamb)
- Project: [Pratishthan-Portal](https://github.com/rushibamb/Pratishthan-Portal)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- Cloudinary for media management services
- All contributors and supporters of this project

---

**Note**: Make sure to replace placeholder values in environment variables with your actual credentials before running the application. 