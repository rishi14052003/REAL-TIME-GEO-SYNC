import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const socket = io(URL, {
  transports: ['websocket', 'polling'],
  autoConnect: false,
  forceNew: true
})

export default socket
