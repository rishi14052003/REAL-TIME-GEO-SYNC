import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
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

const MapTracked = ({ room, setRoom, onConnect }) => {
  const [position, setPosition] = useState([28.6139, 77.2090])
  const [zoom, setZoom] = useState(13)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [trackerOnline, setTrackerOnline] = useState(false)

  useEffect(() => {
    if (room) {
      socket.connect()
      socket.emit('join-room', room, 'tracked')
      
      socket.on('connect', () => {
        setConnectionStatus('connected')
        onConnect(true)
      })
      
      socket.on('disconnect', () => {
        setConnectionStatus('disconnected')
        onConnect(false)
        setTrackerOnline(false)
      })

      socket.on('location-update', (data) => {
        setPosition([data.location.lat, data.location.lng])
        setZoom(data.location.zoom)
        setTrackerOnline(true)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [room, onConnect])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPinned size={20} className="text-purple-400" />
          <span className="text-white font-medium">Tracked Mode</span>
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
        </MapContainer>
      </div>

      <div className="text-center text-sm text-gray-300">
        {trackerOnline ? (
          <span className="text-green-400">Tracker is online and sharing location</span>
        ) : (
          <span className="text-yellow-400">Waiting for tracker to come online...</span>
        )}
      </div>
    </div>
  )
}

export default MapTracked
