import { useState } from 'react'
import { Globe2, Hash, TowerControl, Radar } from 'lucide-react'

const RoleSelector = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [
    {
      id: 'tracker',
      title: 'Tracker',
      description: 'Share your location with others',
      icon: TowerControl,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tracked',
      title: 'Tracked',
      description: 'View someone else\'s location',
      icon: Radar,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    setTimeout(() => onRoleSelect(roleId), 300)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <Globe2 size={64} className="mx-auto text-purple-400 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Role</h2>
        <p className="text-gray-300">Select how you want to use GeoSync</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedRole === role.id
                  ? 'ring-4 ring-white/50 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-2xl opacity-90`} />
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <Icon size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                <p className="text-white/80">{role.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RoleSelector
