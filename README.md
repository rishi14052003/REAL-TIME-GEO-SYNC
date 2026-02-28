# 🌍 GeoSync — Real-time Map Synchronization

> A modern full-stack application that enables real-time map synchronization between multiple users. Perfect for collaborative navigation, location sharing, and coordinated mapping experiences.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-green)](https://socket.io/)

## ✨ Features

- 🔄 **Real-time Synchronization** - Instant map updates across all connected clients
- 👥 **Multi-user Support** - One Tracker broadcasts to multiple Tracked users
- 🗺️ **Google Maps Integration** - Professional mapping with smooth interactions
- 🎯 **Role-based Access** - Clear distinction between Tracker and Tracked roles
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Performance Optimized** - Throttled updates for smooth real-time experience
- 🎨 **Modern UI** - Beautiful Tailwind CSS design with intuitive HUD interface

## 🏗️ Architecture

```
┌─────────────────┐    Socket.io     ┌─────────────────┐
│   Frontend      │◄────────────────►│    Backend      │
│   (React)       │                  │   (Node.js)     │
│                 │                  │                 │
│ • Tracker UI    │                  │ • Room Management│
│ • Tracked UI    │                  │ • State Sync    │
│ • Google Maps   │                  │ • CORS Config   │
└─────────────────┘                  └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern reactive UI framework
- **Vite 5.2.0** - Lightning-fast build tool
- **@react-google-maps/api** - Google Maps integration
- **Socket.io-client** - Real-time communication
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon set

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.19.2** - Web framework
- **Socket.io 4.8.1** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- Google Maps JavaScript API key
- Git for cloning the repository

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/geosync.git
cd geosync
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .envbe .env
```

Configure your backend environment variables:

```bash
# .env
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

Start the backend server:

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .envfe .env
```

Configure your frontend environment variables:

```bash
# .env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to access the application.

## 📖 Usage Guide

### Getting Started

1. **Open the Application** - Navigate to `http://localhost:5173`
2. **Choose Your Role** - Select either "Tracker" or "Tracked"
3. **Create/Join a Room** - Use the generated Room ID or create your own
4. **Share the Room ID** - Send the Room ID to collaborators

### Roles Explained

#### 📡 Tracker (Broadcaster)
- Controls the map view (pan, zoom, navigate)
- Broadcasts changes to all Tracked users in real-time
- Can have multiple Tracked users following their view

#### 🎯 Tracked (Synced)
- Automatically follows the Tracker's map view
- Cannot manually control the map (read-only experience)
- Can re-sync to Tracker's position if needed

### Real-time Features

- **Live Map Updates** - Smooth, throttled updates (10/second max)
- **Connection Status** - Visual indicators for online/offline status
- **Room Management** - Automatic cleanup when users disconnect
- **Presence Detection** - Shows when Tracker is online/offline

## 🌐 Deployment

### Production Deployment

**Frontend**: Deployed on Netlify  
**Backend**: Deployed on Render

The application is currently running in production with real-time map synchronization capabilities.

### Frontend Deployment Options

#### 🌊 Netlify (Current Production)
```bash
# Build and deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

**Environment Variables on Netlify:**
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_BACKEND_URL` (your deployed backend URL)

#### 🚀 Vercel (Alternative)
```bash
# Build for production
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

**Environment Variables on Vercel:**
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_BACKEND_URL` (your deployed backend URL)

#### ⚡ Other Options
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable CDN solution
- **Firebase Hosting** - Google's hosting platform

### Backend Deployment Options

#### 🚂 Render (Current Production)
```bash
# Deploy backend to Render
# Connect your repository and configure build settings
# Render automatically deploys from your main branch
```

**Environment Variables on Render:**
- `PORT` (auto-assigned by Render)
- `FRONTEND_ORIGIN` (your Netlify URL)

#### 🐳 Railway (Alternative)
```bash
# Deploy backend to Railway
railway login
railway init
railway up
```

**Environment Variables on Railway:**
- `PORT` (auto-assigned by Railway)
- `FRONTEND_ORIGIN` (your frontend URL)

#### ☁️ Other Options
- **DigitalOcean App Platform** - Simple deployment
- **AWS EC2 + Elastic Beanstalk** - Enterprise solution

## 🔧 Configuration

### Google Maps API Setup

1. **Get API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable "Maps JavaScript API"
   - Create an API key

2. **Secure Your API Key**
   - Add HTTP referrer restrictions in Google Cloud Console
   - Restrict to your domain(s) only

### CORS Configuration

Update `FRONTEND_ORIGIN` in your backend `.env` to match your production domain:

```bash
# Production
FRONTEND_ORIGIN=https://your-app.vercel.app

# Development
FRONTEND_ORIGIN=http://localhost:5173
```

## 📁 Project Structure

```
geosync/
├── backend/
│   ├── server.js              # Express + Socket.io server
│   ├── package.json           # Backend dependencies
│   ├── .envbe                 # Backend environment template
│   └── config/
│       └── index.js           # Centralized configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HUD.jsx       # Heads-up display component
│   │   │   ├── MapTracker.jsx # Tracker map interface
│   │   │   ├── MapTracked.jsx # Tracked map interface
│   │   │   └── RoleSelector.jsx # Role selection UI
│   │   ├── utils/
│   │   │   ├── socket.js     # Socket.io client helper
│   │   │   └── throttle.js   # Utility function
│   │   ├── config/
│   │   │   └── index.js      # Centralized configuration
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # React entry point
│   │   └── styles.css        # Tailwind CSS imports
│   ├── package.json          # Frontend dependencies
│   └── .envfe               # Frontend environment template
└── README.md                 # This file
```

## 🔄 API Reference

### Socket.io Events

#### Client → Server
- `join-room` - `{ roomId, role }` - Join a room as tracker or tracked
- `map-update` - `{ roomId, center, zoom }` - Broadcast map state (tracker only)

#### Server → Client
- `map-update` - `{ center, zoom, updatedAt }` - Receive map state updates
- `tracker-status` - `{ hasTracker }` - Tracker presence status
- `room-participants` - `{ roomId, trackerId, trackedCount }` - Room info

## 🧪 Development

### Running Tests
```bash
# Frontend tests (if added)
cd frontend
npm test

# Backend tests (if added)
cd backend
npm test
```

### Code Quality
```bash
# Lint frontend
cd frontend
npm run lint

# Lint backend
cd backend
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Maps Platform](https://developers.google.com/maps) for the amazing mapping API
- [Socket.io](https://socket.io/) for seamless real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set

## 📞 Support

If you have any questions or need support, feel free to:

- Create an [Issue](https://github.com/yourusername/geosync/issues)
- Start a [Discussion](https://github.com/yourusername/geosync/discussions)
- Contact me directly at [your-email@example.com]

---

**⭐ Star this repository if it helped you!**

