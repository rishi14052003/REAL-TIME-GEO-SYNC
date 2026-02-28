const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { config } = require('./config');

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ['https://geosync-frontend.onrender.com', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: ['https://geosync-frontend.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const rooms = new Map();

io.on('connection', (socket) => {

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
    
  });

  socket.on('map-update', ({ roomId, center, zoom }) => {
    socket.to(roomId).emit('map-update', { center, zoom });
  });

  socket.on('disconnect', () => {
    
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

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || config.server.port;
server.listen(PORT, '0.0.0.0', () => {
});
