import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  Brain, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Screen } from '../../types';
import { ThemeToggle } from '../ui/ThemeToggle';

interface SidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentScreen, 
  onScreenChange, 
  isCollapsed, 
  onToggleCollapse,
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions' as Screen, label: 'Transactions', icon: CreditCard },
    { id: 'budget' as Screen, label: 'Budget', icon: Target },
    { id: 'insights' as Screen, label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className={`bg-white/5 dark:bg-white/5 backdrop-blur-xl border-r border-white/10 dark:border-white/5 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden md:flex flex-col`}>
      <div className="p-6 border-b border-white/10 dark:border-white/5">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinTrack</h1>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onScreenChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10 dark:border-white/5">
        <div className="space-y-2">
          {!isCollapsed && (
            <div className="mb-4">
              <ThemeToggle />
            </div>
          )}
          
          <button className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Settings</span>}
          </button>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};