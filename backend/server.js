require('dotenv').config();
const config = require('./config');

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors({ 
  origin: config.cors.frontendOrigin, 
  methods: config.cors.methods, 
  credentials: config.cors.credentials 
}));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.cors.frontendOrigin,
    methods: config.cors.methods,
    credentials: config.cors.credentials
  },
  transports: ['websocket', 'polling'],
  upgradeTimeout: 30000,
  pingInterval: 25000,
  pingTimeout: 60000
});

const rooms = {};

io.on('connection', (socket) => {

  socket.on('join-room', ({ roomId, role }) => {
    if (!roomId || !role) return;

    socket.join(roomId);
    socket.data.roomId = roomId;
    socket.data.role = role;

    if (!rooms[roomId]) {
      rooms[roomId] = {
        trackerSocketId: null,
        trackedSocketIds: new Set(),
        lastMapState: null
      };
    }

    const room = rooms[roomId];

    if (role === 'tracker') {
      room.trackerSocketId = socket.id;
      io.to(roomId).emit('tracker-status', { hasTracker: true });
      if (room.lastMapState) {
        socket.emit('map-update', room.lastMapState);
      }
    } else if (role === 'tracked') {
      room.trackedSocketIds.add(socket.id);
      if (room.lastMapState) {
        socket.emit('map-update', room.lastMapState);
      }
      socket.emit('tracker-status', { hasTracker: !!room.trackerSocketId });
    }

    io.to(roomId).emit('room-participants', {
      roomId,
      trackerId: room.trackerSocketId,
      trackedCount: room.trackedSocketIds.size
    });

  });

  socket.on('map-update', ({ roomId, center, zoom }) => {
    if (!roomId || !center || typeof zoom !== 'number') return;

    const room = rooms[roomId];
    if (!room) return;

    if (socket.id !== room.trackerSocketId) return;

    const payload = { center, zoom, updatedAt: Date.now() };
    room.lastMapState = payload;

    socket.to(roomId).emit('map-update', payload);
  });

  socket.on('disconnect', () => {
    const { roomId, role } = socket.data || {};

    if (!roomId || !rooms[roomId]) return;

    const room = rooms[roomId];

    if (role === 'tracker' && room.trackerSocketId === socket.id) {
      room.trackerSocketId = null;
      io.to(roomId).emit('tracker-status', { hasTracker: false });
    } else if (role === 'tracked') {
      room.trackedSocketIds.delete(socket.id);
    }

    if (!room.trackerSocketId && room.trackedSocketIds.size === 0) {
      delete rooms[roomId];
    } else {
      io.to(roomId).emit('room-participants', {
        roomId,
        trackerId: room.trackerSocketId,
        trackedCount: room.trackedSocketIds.size
      });
    }
  });
});

app.get('/', (_req, res) => {
  res.json({ status: 'GeoSync backend running' });
});

server.listen(config.server.port, () => {
});

