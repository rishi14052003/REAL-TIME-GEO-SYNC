const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info'
  },
  cors: {
    frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    methods: process.env.SOCKET_CORS_METHODS?.split(',') || ['GET', 'POST'],
    credentials: process.env.SOCKET_CORS_CREDENTIALS === 'true'
  },
  socket: {
    maxUpdatesPerSecond: parseInt(process.env.MAX_UPDATES_PER_SECOND) || 10
  }
};

module.exports = config;
