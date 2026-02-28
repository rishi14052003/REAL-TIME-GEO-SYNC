import { useState } from 'react'
import RoleSelector from './components/RoleSelector'
import MapTracker from './components/MapTracker'
import MapTracked from './components/MapTracked'
import HUD from './components/HUD'
import { Compass, MapIcon } from 'lucide-react'

function App() {
  const [role, setRole] = useState('')
  const [room, setRoom] = useState('')
  const [connected, setConnected] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass size={32} className="text-purple-400" />
            <h1 className="text-4xl font-bold text-white">GeoSync</h1>
            <MapIcon size={32} className="text-purple-400" />
          </div>
          <p className="text-gray-300">Real-time Location Synchronization</p>
        </header>

        {!role ? (
          <RoleSelector onRoleSelect={setRole} />
        ) : (
          <div className="space-y-6">
            <HUD role={role} room={room} connected={connected} />
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
              {role === 'tracker' ? (
                <MapTracker 
                  room={room} 
                  setRoom={setRoom}
                  onConnect={setConnected}
                />
              ) : (
                <MapTracked 
                  room={room} 
                  setRoom={setRoom}
                  onConnect={setConnected}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
