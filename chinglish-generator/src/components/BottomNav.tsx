import React from 'react'
import { NavLink } from 'react-router-dom'
import { Wand2, History, Sparkles } from 'lucide-react'

export const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/', icon: Wand2, label: '翻译' },
    { path: '/history', icon: History, label: '历史' },
    { path: '/examples', icon: Sparkles, label: '示例' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-6 h-6 mb-1 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
