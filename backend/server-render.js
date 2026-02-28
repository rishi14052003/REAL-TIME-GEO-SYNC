const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { config } = require('./config');

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: ['https://geosync-frontend.onrender.com', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: ['https://geosync-frontend.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store room data
const rooms = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, role }) => {
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, { tracker: null, tracked: [] });
    }
    
    const room = rooms.get(roomId);
    
    if (role === 'tracker') {
      room.tracker = socket.id;
      socket.to(roomId).emit('tracker-status', { hasTracker: true });
    } else {
      room.tracked.push(socket.id);
      socket.emit('tracker-status', { hasTracker: !!room.tracker });
    }
    
    console.log(`User ${socket.id} joined room ${roomId} as ${role}`);
  });

  socket.on('map-update', ({ roomId, center, zoom }) => {
    socket.to(roomId).emit('map-update', { center, zoom });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Remove user from rooms
    rooms.forEach((room, roomId) => {
      if (room.tracker === socket.id) {
        room.tracker = null;
        socket.to(roomId).emit('tracker-status', { hasTracker: false });
      } else {
        room.tracked = room.tracked.filter(id => id !== socket.id);
      }
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || config.server.port;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
