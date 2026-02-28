import { useState, useEffect } from 'react'
import { Hash, Activity, Link2, MapPinned, Wifi, WifiOff } from 'lucide-react'

const HUD = ({ role, room, connected }) => {
  const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 })
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Hash size={18} className="text-purple-400" />
          <div>
            <p className="text-xs text-gray-400">Room</p>
            <p className="text-white font-medium">{room || 'Not Set'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPinned size={18} className="text-purple-400" />
          <div>
            <p className="text-xs text-gray-400">Coordinates</p>
            <p className="text-white font-medium">
              <span className="text-blue-400">{coordinates.lat.toFixed(5)}</span>, 
              <span className="text-green-400">{coordinates.lng.toFixed(5)}</span>
              {isLive && <span className="text-red-400 animate-pulse"> ●</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {connected ? <Wifi size={18} className="text-green-400" /> : <WifiOff size={18} className="text-red-400" />}
          <div>
            <p className="text-xs text-gray-400">Status</p>
            <p className={`font-medium ${connected ? 'text-green-400' : 'text-red-400'}`}>
              {connected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {role === 'tracker' ? <Activity size={14} className="text-blue-400" /> : <Link2 size={14} className="text-purple-400" />}
            <span className="text-sm text-gray-300 capitalize">{role} Mode</span>
          </div>
          <div className="text-xs text-gray-400">
            Real-time sync {connected ? 'active' : 'inactive'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HUD
