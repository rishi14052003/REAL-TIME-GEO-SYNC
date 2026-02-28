import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet'
import socket from '../utils/socket'
import { MapPinned, Wifi, WifiOff, Activity } from 'lucide-react'

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const MapTracker = ({ room, setRoom, onConnect }) => {
  const [position, setPosition] = useState([28.6139, 77.2090])
  const [zoom, setZoom] = useState(13)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')

  useEffect(() => {
    if (room) {
      socket.connect()
      socket.emit('join-room', room, 'tracker')
      
      socket.on('connect', () => {
        setConnectionStatus('connected')
        onConnect(true)
      })
      
      socket.on('disconnect', () => {
        setConnectionStatus('disconnected')
        onConnect(false)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [room, onConnect])

  const MapEvents = () => {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter()
        const newZoom = e.target.getZoom()
        setPosition([center.lat, center.lng])
        setZoom(newZoom)
        
        if (room && socket.connected) {
          socket.emit('location-update', {
            room,
            location: {
              lat: center.lat,
              lng: center.lng,
              zoom: newZoom
            }
          })
        }
      }
    })
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinned size={20} className="text-purple-400" />
          <span className="text-white font-medium">Tracker Mode</span>
        </div>
        <div className="flex items-center gap-2">
          {connectionStatus === 'connected' ? (
            <Wifi size={20} className="text-green-400" />
          ) : (
            <WifiOff size={20} className="text-red-400" />
          )}
          <span className={`text-sm ${connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
            {connectionStatus}
          </span>
        </div>
      </div>

      <div className="h-96 rounded-xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon} />
          <MapEvents />
        </MapContainer>
      </div>

      <div className="text-center text-sm text-gray-300">
        Move the map to share your location in real-time
      </div>
    </div>
  )
}

export default MapTracker
